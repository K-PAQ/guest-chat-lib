import { createApp } from 'vue'
import App from './App.vue'
import GuestChatLib from 'guest-chat-lib'
import 'guest-chat-lib/dist/style.css'

createApp(App).use(GuestChatLib).mount('#app')
