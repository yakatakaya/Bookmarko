<script setup lang="ts">
import Bookmarko from './components/Bookmarko.vue'
import '@mdi/font/css/materialdesignicons.css' // Import the Material Design Icons CSS

function redirectToGoogle() {
  window.location.href = 'https://www.google.com';
}
</script>

<template>
  <v-app>
    <v-app-bar app dark>
      <img src="/bookmark_128.png" alt="Bookmark Icon" style="height: 30px; margin: 0 10px 0 20px;">
      <v-toolbar-title>Bookmarko</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="redirectToGoogle">
        <v-icon color="white">mdi-google</v-icon>
      </v-btn>
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
  background-color: #0E3147; /* 薄いグレー */
  height: 100vh;
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