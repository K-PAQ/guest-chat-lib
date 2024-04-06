import { Socket } from "socket.io-client"

export interface MessageInterface {
    _id: string
    receiverId: string
    message?: string
    file?: string
    fileName?: string
    photo?: string
    isRead: boolean
    dateRead?: Date
    dateCreated: Date
    sender: {
        _id: string
        appId: string
        guest: {
            guestId: string
            handledBy: string
        }
        admin: {
            name: string
            email: string
        }
    }
    isBot: boolean
}

export interface AppState {
    appId: null | string
    widgetIsOpen: boolean
    queue: {
        isLoading: boolean
        inChatProgress: boolean
    }
    guestId: null | string
    guestPrimaryId: null | string
    adminHandler: {
        _id: string
        appId: string
        admin: {
            name: string
            email: string
        }
    } | null
    chat: {
        draftMessage: string
        messageList: MessageInterface[]
    },
    socket: {
        isConnected: boolean
        io: Socket
    };
}