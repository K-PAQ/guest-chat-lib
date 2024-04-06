import GuestChatLib from './App.vue'
import { registerPlugins } from '@/plugins'

export default {
    install: (app, opt) => {
        registerPlugins(app)
        app.component('GuestChatLib', GuestChatLib)
    },
}
