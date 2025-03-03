chrome.runtime.onInstalled.addListener(() => {
  chrome.bookmarks.getTree((bookmarkTreeNodes) => {
    chrome.storage.local.set({ bookmarks: bookmarkTreeNodes });
  });
});

chrome.bookmarks.onChanged.addListener(() => {
  chrome.bookmarks.getTree((bookmarkTreeNodes) => {
    chrome.storage.local.set({ bookmarks: bookmarkTreeNodes });
  });
});

chrome.bookmarks.onCreated.addListener(() => {
  chrome.bookmarks.getTree((bookmarkTreeNodes) => {
    chrome.storage.local.set({ bookmarks: bookmarkTreeNodes });
  });
});

chrome.bookmarks.onRemoved.addListener(() => {
  chrome.bookmarks.getTree((bookmarkTreeNodes) => {
    chrome.storage.local.set({ bookmarks: bookmarkTreeNodes });
  });
});