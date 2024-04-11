import type { App } from 'vue'
import GuestChatLib from './App.vue'
import { registerPlugins } from './plugins'

export default {
    install: (app: App, opt) => {
        registerPlugins(app)
        app.component('GuestChatLib', GuestChatLib)
    },
}
