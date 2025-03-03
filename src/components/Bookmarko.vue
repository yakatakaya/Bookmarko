<template>
    <div>
      <h1>Chrome Bookmarks</h1>
      <ul>
        <li v-for="bookmark in bookmarks" :key="bookmark.url">
          <a :href="bookmark.url" target="_blank">{{ bookmark.title }}</a>
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    data() {
      return {
        bookmarks: [] as Array<{ title: string, url: string }>
      };
    },
    created() {
      this.loadBookmarks();
    },
    methods: {
      loadBookmarks() {
        chrome.bookmarks.getTree((bookmarkTreeNodes) => {
          this.bookmarks = this.flattenBookmarks(bookmarkTreeNodes);
        });
      },
      flattenBookmarks(bookmarkTreeNodes: chrome.bookmarks.BookmarkTreeNode[]): { title: string, url: string }[] {
        let result: { title: string, url: string }[] = [];
        for (let node of bookmarkTreeNodes) {
          if (node.children) {
            result = result.concat(this.flattenBookmarks(node.children));
          } else if (node.url) {
            result.push({ title: node.title, url: node.url });
          }
        }
        return result;
      }
    }
  };
  </script>
  
  <style>
  /* 任意のスタイル */
  </style>
  