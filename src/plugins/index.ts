/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import { createPinia } from 'pinia' 

// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  const pinia = createPinia()
  
  app.use(pinia)
  app.use(vuetify)
}
