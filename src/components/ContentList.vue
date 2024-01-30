<!-- @format -->

<script setup lang="ts">
// 列表数据，包括 id 和 content
import {reactive} from "vue";

const list = reactive([
  { id: 1, content: "content 1" },
  { id: 2, content: "content 2" },
  { id: 3, content: "content 3" },
  { id: 4, content: "content 4" },
  { id: 5, content: "content 5" },
  { id: 6, content: "content 6" },
  { id: 7, content: "content 7" },
  { id: 8, content: "content 8" },
  { id: 9, content: "content 9" },
  { id: 10, content: "content 10" },
  { id: 11, content: "content 11" },
  { id: 12, content: "content 12" },
  { id: 13, content: "content 13" },
  { id: 14, content: "content 14" },
  { id: 15, content: "content 15" },
  { id: 16, content: "content 16" },
  { id: 17, content: "content 17" },
  { id: 18, content: "content 18" },
  { id: 19, content: "content 19" },
  { id: 20, content: "content 20" },
  { id: 21, content: "content 21" },
  { id: 22, content: "content 22" },
  { id: 23, content: "content 23" },
  { id: 24, content: "content 24" },
  { id: 25, content: "content 25" },
  { id: 26, content: "content 26" },
  { id: 27, content: "content 27" },
  { id: 28, content: "content 28" },
  { id: 29, content: "content 29" },
  { id: 30, content: "content 30" },
  { id: 31, content: "content 31" },
  { id: 32, content: "content 32" },
  { id: 33, content: "content 33" },
]);
</script>

<template>
  <ul class="container">
    <li v-for="item in list" :key="item.id">
      {{ item.content }}
    </li>
  </ul>
</template>

<style scoped>
.container {
  background-color: skyblue;
  height: 100%;
}
</style>
