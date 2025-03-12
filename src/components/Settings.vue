<template>
  <v-card style="width: 400px;">
    <v-card-title>Settings</v-card-title>
    <v-card-text>
      <v-form>
        <v-label>Background color</v-label>
        <v-color-picker v-model="color" label="Pick a background color" class="stacked-element"></v-color-picker>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="saveSettings">Save</v-btn>
      <v-btn variant="text">Cancel</v-btn>
      <v-btn variant="text" @click="resetToDefault">Reset to Default</v-btn> <!-- Added button -->
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const color = ref('#0E3147');

function saveSettings() {
  chrome.storage.sync.set({ backgroundColor: color.value }, () => {
    console.log('Settings saved');
    location.reload(); // Reload the page
  });
}

function resetToDefault() {
  color.value = '#0E3147'; // Reset to default color
  location.reload(); // Reload the page
}
</script>

<style scoped>
.stacked-element {
  margin-bottom: 16px;
}
</style>
