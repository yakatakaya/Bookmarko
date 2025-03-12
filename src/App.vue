<script setup lang="ts">
import Bookmarko from './components/Bookmarko.vue'
import Settings from './components/Settings.vue' // Import the Settings component
import { ref } from 'vue'

const showSettings = ref(false);

function redirectToGoogle() {
  window.location.href = 'https://www.google.com';
}

function handleKeydown(event: KeyboardEvent) {
  if (event.altKey && event.key === 'g') {
    redirectToGoogle();
  }
}

window.addEventListener('keydown', handleKeydown);
</script>

<template>
  <v-app>
    <v-app-bar>
      <img src="/bookmark_128.png" alt="Bookmark Icon" style="height: 30px; margin: 0 10px 0 20px;">
      <v-toolbar-title>Bookmarko</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="redirectToGoogle">
        <v-icon>mdi-google</v-icon>
      </v-btn>
      <v-menu v-model="showSettings" offset-y :close-on-content-click="false">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>
        <Settings />
      </v-menu>
    </v-app-bar>
      
    <div class="app-container">
      <div class="content-container">
        <Bookmarko />
      </div>
    </div>
  </v-app>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 1.0;
  padding-top: 150px;
}

.content-container {
  margin: 0 auto; /* 中央揃えにします */
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>