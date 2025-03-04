<template>
  <div class="menu-item" id="item1" @click="openNewTab">Open new tab</div>
  <div class="menu-item" id="item2" @click="openCurrentTab">Open current tab</div>
</template>

<script lang="ts">
export default {
    methods: {
        openNewTab(): void {
            const extensionId = chrome.runtime.id; // 拡張機能のIDを取得
            console.log("拡張ID:", extensionId);
            chrome.tabs.create({
            url: `chrome-extension://${extensionId}/index.html`
            });
        },
        openCurrentTab(): void {
            const extensionId = chrome.runtime.id; // 拡張機能のIDを取得
            console.log("拡張ID:", extensionId);
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                if (tabs.length > 0) { // tabsが空でないことを確認
                    const tabId = tabs[0].id;
                    if (tabId !== undefined) {
                    chrome.tabs.update(tabId, {
                        url: `chrome-extension://${extensionId}/index.html`
                    });
                    }
                }            
            });
        }
    },
};
</script>

<style scoped>
    body {
      width: 200px;
      font-family: Arial, sans-serif;
      padding: 10px;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .menu-item {
      padding: 10px;
      margin: 5px 0;
      background-color: #f1f1f1;
      border-radius: 5px;
      cursor: pointer;
    }

    .menu-item:hover {
      background-color: #ddd;
    }
</style>
