import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'

import App from './App.vue'
//import '@mdi/font/css/materialdesignicons.css' // Import the Material Design Icons CSS

const vuetify = createVuetify({
    theme: {
        defaultTheme: 'dark',
      },
    components,
})

chrome.storage.sync.get('backgroundColor', (result) => {
  if (result.backgroundColor) {
    vuetify.theme.themes.value.dark.colors.background = result.backgroundColor;
  }
});

createApp(App).use(vuetify).mount('#app')
