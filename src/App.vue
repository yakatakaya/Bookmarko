<script setup lang="ts">
import Bookmarko from './components/Bookmarko.vue'
</script>

<template>
  <div class="app-container">
    <img src="/bookmarko.png" alt="Bookmarko Logo" class="logo" />
    <div class="content-container">
      <Bookmarko />
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #0E3147; /* 薄いグレー */
  height: 100vh;
}

.logo {
  width: 35vw; /* ロゴの幅をウィンドウサイズの25%に指定 */
  height: auto;
  margin-top: 20px; /* 上部にマージンを追加 */
}

.content-container {
  margin: 0 auto; /* 中央揃えにします */
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>