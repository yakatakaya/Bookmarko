<template>
  <v-container fluid class="centered-container container">
    <div v-for="folder in folders" :key="folder.id" :style="{ width: cardWidth + 'px' }" class="card">
      <v-card>
        <v-card-title class="custom-card-title">{{ folder.title }}</v-card-title>
        <v-card-text>
          <ul class="no-bullets">
            <li v-for="bookmark in folder.bookmarks" :key="bookmark.id" class="url-link">
              <img :src="getFaviconUrl(bookmark.url)" alt="favicon" class="favicon">
              <a :href="bookmark.url" target="_blank" class="ellipsis">{{ bookmark.title }}</a>
            </li>
          </ul>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import './css/Bookmarko.css'

interface Bookmark {
  id: string;
  title: string;
  url: string;
}

interface Folder {
  id: string;
  title: string;
  bookmarks: Bookmark[];
}

export default defineComponent({
  data() {
    return {
      folders: [] as Folder[],
      cardWidth: 200, // Default card width
    };
  },
  async created() {
    try {
      this.loadBookmarks();
      this.loadCardWidth();
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  },
  methods: {
    loadBookmarks() {
      chrome.bookmarks.getTree((bookmarkTreeNodes) => {
        bookmarkTreeNodes.forEach((node) => {
          node.children?.forEach((child) => {
            console.info(JSON.stringify(child, null, 2));
            if (child.index === 0) {
              console.info(JSON.stringify(child, null, 2));
              this.folders = this.processBookmarks([child]);
            }
          });
        });
      });
    },
    loadCardWidth() {
      chrome.storage.sync.get('cardWidth', (result) => {
        this.cardWidth = result.cardWidth || this.cardWidth;
      });
    },
    processBookmarks(bookmarkTreeNodes: chrome.bookmarks.BookmarkTreeNode[]): Folder[] {
      const folders: Folder[] = [];
      const processNode = (node: chrome.bookmarks.BookmarkTreeNode) => {
        if (node.children) {
          const folder: Folder = {
            id: node.id,
            title: node.title,
            bookmarks: [],
          };
          node.children.forEach((child: chrome.bookmarks.BookmarkTreeNode) => {
            if (child.url) {
              folder.bookmarks.push({
                id: child.id,
                title: child.title || 'Untitled',
                url: child.url,
              });
            } else {
              processNode(child);
            }
          });
          if (node.title) {
            folders.push(folder);
          }
        }
      };
      bookmarkTreeNodes.forEach((node) => processNode(node));
      return folders;
    },
    getFaviconUrl(url: string): string {
      return `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}`;
    },
  },
});
</script>