chrome.runtime.onInstalled.addListener(() => {
    const extensionId = chrome.runtime.id; // 拡張機能のIDを取得
    console.log("拡張ID:", extensionId);
  
    // 新しいタブを開く例
    chrome.tabs.create({
      url: `chrome-extension://${extensionId}/index.html`
    });
  });