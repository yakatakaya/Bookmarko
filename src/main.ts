import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import App from './App.vue'

const vuetify = createVuetify({
    theme: {
        defaultTheme: 'dark',
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

chrome.storage.sync.get('backgroundColor', (result) => {
  if (result.backgroundColor) {
    vuetify.theme.themes.value.dark.colors.background = result.backgroundColor;
  } else {
    vuetify.theme.themes.value.dark.colors.background = '#122029'; // Default background color
  }
});

createApp(App).use(vuetify).mount('#app')
