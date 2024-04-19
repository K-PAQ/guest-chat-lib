/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from './plugins'

// Components
import localRun from './local.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(localRun)

registerPlugins(app)

app.mount('GuestChatLib')
