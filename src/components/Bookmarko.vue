<template>
  <v-row>
    <v-col v-for="folder in folders" :key="folder.id" cols="12" md="4">
      <v-card>
        <v-card-title>{{ folder.title }}</v-card-title>
        <v-card-text>
          <ul>
            <li v-for="bookmark in folder.bookmarks" :key="bookmark.id" class="left-align">
              <a :href="bookmark.url" target="_blank">{{ bookmark.title }}</a>
            </li>
          </ul>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
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
  },
});
</script>

<style scoped>
.v-card {
  margin: 10px 0;
}

.left-align {
  text-align: left;
}
</style>