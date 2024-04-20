import { defineStore } from 'pinia'
import { AppState } from './types'
import { v4 as uuidv4 } from 'uuid'
import { BASE_URL, SOCKET_EVENTS, SOCKET_URL } from './constants'
import { io } from 'socket.io-client'

export default defineStore('chat', {
    state: (): AppState => ({
        appId: 'test',
        widgetIsOpen: false,
        queue: {
            isLoading: false,
            inChatProgress: false
        },
        guestId: null, // this is the secondary ID morelikely to show on the frontend
        guestPrimaryId: null, // this is the ID from the database
        adminHandler: null,
        chat: {
            draftMessage: '',
            messageList: []
        },
        socket: {
            isConnected: false,
            io: io(SOCKET_URL)
        },
        // CUSTOMIZATION
        appHeader: 'Chat Support',
        waitingMessage: 'Please be aware that it might take a while to connect with support as there may be a queue. We appreciate your patience.',
        colors: {
            primary: "#158DE8",
            secondary: "#BBDEFB"
        }
    }),
    actions: {
        WatchGuestChatEnded() {
            this.socket.io.on(SOCKET_EVENTS.GUEST_CHAT_ENDED, (id) => {
                this.socket.io.close()
                this.socket.io.connect()
                this.queue = {
                    isLoading: false,
                    inChatProgress: false
                }
                this.socket.isConnected = false
            })
        },
        WatchQueueHandle() {
            this.socket.io.on(SOCKET_EVENTS.GUEST_HANDLED, ({ handler }) => {
                if (!handler) return console.log("Handler state: ", handler)
                this.chat = {
                    draftMessage: '',
                    messageList: []
                }
                this.adminHandler = handler.guest.handledBy
                this.guestPrimaryId = handler._id
                this.queue.inChatProgress = true

                console.log("handler : ", handler)

                this.fetchChats()
            })
        },
        WatchIncomingMessages() {
            this.socket.io.on(SOCKET_EVENTS.INCOMING_MESSAGES, (messageReceived) => {
                if (!this.appId) return console.error('App id is undefined')

                // HANDLES UPDATES ON CHAT BUBBLES
                if (messageReceived.senderId._id == this.adminHandler?._id) {
                    this.chat.messageList.push({
                        _id: messageReceived._id,
                        receiverId: messageReceived.receiverId._id,
                        message: messageReceived.message,
                        isRead: messageReceived.isRead,
                        dateCreated: messageReceived.dateCreated,
                        isBot: messageReceived.isBot,
                        sender: messageReceived.senderId
                    })
                }
            })
        },
        async handleSendMessage() {
            const message = this.chat.draftMessage?.trim()
            if (!message) return

            if (!this.adminHandler?._id) return console.error("Missing admin Id")
            if (!this.appId) return console.error("Missing App Id")
            if (!this.guestPrimaryId) return console.error("Missing Guest primary ID")

            this.socket.io.emit(SOCKET_EVENTS.SEND_MESSAGE, {
                appId: this.appId,
                message,
                userId: this.guestPrimaryId,
                targetUserId: this.adminHandler?._id
            })

            this.chat.messageList.push({
                _id: await uuidv4(),
                receiverId: this.adminHandler?._id,
                message,
                dateCreated: new Date(),
                sender: {
                    _id: this.guestPrimaryId,
                    appId: this.appId,
                    guest: {
                        guestId: this.guestId,
                        handledBy: this.adminHandler?._id
                    }
                }
            })

            this.chat.draftMessage = ''
        },
        async fetchChats() {
            try {
                if (!this.adminHandler?._id) throw "Admin Id not found"

                const api = await fetch(`${BASE_URL}/messages/private`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        appId: this.appId,
                        userId: this.guestPrimaryId,
                        targetUserId: this.adminHandler?._id
                    })
                })
                const response = await api.json()

                if (!response.status) throw response.error

                this.chat.messageList = response.data
            } catch (err) {
                alert(err)
            }
        },
        async generateGuestId() {
            try {
                this.queue.isLoading = true
                const id = await uuidv4()

                const api = await fetch(`${BASE_URL}/guest/create`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        appId: this.appId,
                        guestId: id
                    })
                })
                const response = await api.json()
                if (!response?.status) throw response.error

                this.guestId = id
                this.socket.io.emit(SOCKET_EVENTS.GUEST_CONNECT, { guestId: id, appId: this.appId })
                this.socket.isConnected = true
            }
            catch (error) {
                console.log(error)
            }
        }
    },
})