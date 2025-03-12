<template>
  <v-card style="width: 400px;">
    <v-card-title>Settings</v-card-title>
    <v-card-text>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title>Background Color</v-expansion-panel-title>
          <v-expansion-panel-text>
            <!-- Add your background color settings here -->
            <v-color-picker v-model="backgroundColor" flat></v-color-picker>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="saveSettings">Save</v-btn>
      <v-btn variant="text" @click="resetToDefault">Reset to Default</v-btn> <!-- Added button -->
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const backgroundColor = ref('#ffffff'); // Default background color

function saveSettings() {
  chrome.storage.sync.set({ backgroundColor: backgroundColor.value }, () => {
    console.log('Settings saved');
    location.reload(); // Reload the page
  });
}

function resetToDefault() {
  backgroundColor.value = '#0E3147'; // Reset to default color
  location.reload(); // Reload the page
}
</script>

<style scoped>
.stacked-element {
  margin-bottom: 16px;
}
</style>
