export const BASE_URL = 'http://localhost:8001/api'
export const SOCKET_URL = 'http://localhost:8001'

export const SOCKET_EVENTS = {
    GUEST_CONNECT : 'guest:connect',
    SEND_MESSAGE: 'chat:send-message',

    // LISTENERS IN CLIENT SIDE
    INCOMING_MESSAGES: 'chat:incoming-messages',
    GUEST_HANDLED: 'guest:handled',
}