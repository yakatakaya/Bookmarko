<template>
  <v-container fluid class="centered-container">
    <v-row align="stretch">
      <v-col v-for="folder in folders" :key="folder.id" cols="12" sm="4" md="3" lg="2" class="padded-col">
        <v-card>
          <v-card-title class="custom-card-title">{{ folder.title }}</v-card-title>
          <v-card-text>
            <ul class="no-bullets">
              <li v-for="bookmark in folder.bookmarks" :key="bookmark.id" class="left-align">
                <img :src="getFaviconUrl(bookmark.url)" alt="favicon" class="favicon">
                <a :href="bookmark.url" target="_blank" class="ellipsis">{{ bookmark.title }}</a>
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

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
    };
  },
  async created() {
    try {
      this.loadBookmarks();
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  },
  methods: {
    loadBookmarks() {
      chrome.bookmarks.getTree((bookmarkTreeNodes) => {
        this.folders = this.processBookmarks(bookmarkTreeNodes);
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

<style scoped>
.centered-container {
  margin: 0 auto;
  width: 90%; /* 親要素をはみ出さないようにする */
}

.left-align {
  text-align: left;
  display: flex;
  align-items: center;
}

.no-bullets {
  list-style-type: none;
  padding-left: 0;
}

.custom-card-title {
  background-color: #7b7b7b; /* ここで背景色を指定します */
  color: #ffffff; /* 必要に応じてテキストの色も指定します */
}

li.left-align:hover {
  background-color: #e0e0e0; /* ハイライトの背景色を指定します */
}

.favicon {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

a {
  color: inherit; /* リンクの文字色を親要素から継承します */
  text-decoration: none; /* 必要に応じて下線を消します */
}

.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  max-width: 100%;
}

.padded-col {
  padding: 8px; /* 必要に応じてパディングを設定します */
  box-sizing: border-box; /* パディングを含めたサイズにします */
}
</style>