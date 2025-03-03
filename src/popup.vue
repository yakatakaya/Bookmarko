<template>
<div>
    <a href="javascript:void(0);" @click="openNewTab">Open new tab</a>
    <br>
    <a href="javascript:void(0);" @click="openCurrentTab">Open current tab</a></div>
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
button {
padding: 10px;
font-size: 16px;
}
</style>
  