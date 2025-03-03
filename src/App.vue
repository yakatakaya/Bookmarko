<script setup lang="ts">
import Bookmarko from './components/Bookmarko.vue'
</script>

<template>
  <div class="app-container">
    <h1 class="title">Bookmarko</h1>
    <v-container class="content-container" fluid>
      <Bookmarko />
    </v-container>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.title {
  text-align: center;
  margin: 0;
  padding: 20px 0;
  font-size: 3rem;
}

.content-container {
  flex: 1;
  overflow: auto;
}
</style>