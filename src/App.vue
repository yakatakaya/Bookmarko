<script setup lang="ts">
import Bookmarko from './components/Bookmarko.vue'
</script>

<template>
  <div>
    <h1 class="title">Bookmarko</h1>
    <div class="content-container">
      <Bookmarko />
    </div>
  </div>
</template>

<style scoped>
.title {
  text-align: center;
  margin: 0;
  padding: 20px 0;
  font-size: 3rem;
}

.content-container {
  margin: 0 auto; /* 中央揃えにします */
}
</style>