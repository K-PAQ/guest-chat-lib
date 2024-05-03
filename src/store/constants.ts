export const BASE_URL: string = 'https://server.smsuno.clairemontferrond.net:8001/api'
export const SOCKET_URL: string = 'https://server.smsuno.clairemontferrond.net:8001'

export enum SocketEventEnum {
    GUEST_CONNECT = 'guest:connect',
    SEND_MESSAGE = 'chat:send-message',

    // Define listeners in the client side
    INCOMING_MESSAGES = 'chat:incoming-messages',
    GUEST_HANDLED = 'guest:handled',
    GUEST_CHAT_ENDED = 'guest:chat-ended'
}

export const SOCKET_EVENTS = {
    GUEST_CONNECT: SocketEventEnum.GUEST_CONNECT,
    SEND_MESSAGE: SocketEventEnum.SEND_MESSAGE,

    // Define listeners in the client side
    INCOMING_MESSAGES: SocketEventEnum.INCOMING_MESSAGES,
    GUEST_HANDLED: SocketEventEnum.GUEST_HANDLED,
    GUEST_CHAT_ENDED: SocketEventEnum.GUEST_CHAT_ENDED
}