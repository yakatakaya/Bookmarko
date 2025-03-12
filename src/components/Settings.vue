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

const backgroundColor = ref('#122029'); // Default background color
chrome.storage.sync.get('backgroundColor', (result) => {
  backgroundColor.value = result.backgroundColor || backgroundColor.value;
});

function saveSettings() {
  chrome.storage.sync.set({ backgroundColor: backgroundColor.value }, () => {
    console.log('Settings saved');
    location.reload(); // Reload the page
  });
}

function resetToDefault() {
  backgroundColor.value = '#122029'; // Reset to default color
  chrome.storage.sync.set({ backgroundColor: backgroundColor.value }, () => {
    console.log('Settings saved');
    location.reload(); // Reload the page
  });
}
</script>

<style scoped>
.stacked-element {
  margin-bottom: 16px;
}
</style>
