import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi' // Import the mdi icon set

import App from './App.vue'
import '@mdi/font/css/materialdesignicons.css' // Import the Material Design Icons CSS

const vuetify = createVuetify({
    theme: {
        defaultTheme: 'dark',
        themes: {
          dark: {
            colors: {
                background: '#0E3147', // 背景色を変更
            }
          },
        },
      },
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
})

createApp(App).use(vuetify).mount('#app')
