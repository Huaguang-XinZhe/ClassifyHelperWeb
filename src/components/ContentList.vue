<!-- @format -->

<script setup lang="ts">
// 列表数据，包括 id 和 content
import { useAppStore } from "@/stores/appStore";

const appStore = useAppStore();
const inputList = appStore.inputList;
</script>

<template>
  <ul>
    <li v-for="input in inputList" :key="input.id" draggable="true">
      {{ input.content }}
    </li>
  </ul>
</template>

<style scoped>
ul {
  width: 50%;
  background-color: skyblue;
  height: 100%;
  overflow: auto;
  /*设置它就可以让一些字母数字组合在超出容器边接的时候断行！并且不出现横向滚动条！*/
  overflow-wrap: break-word;
  /*不要用 grid 布局，这样宽度就失效了，又会出现滚动条！*/
  display: flex;
  /*flex 布局默认是横向的，要显式声明*/
  flex-direction: column;
  gap: 60px;
}

li {
  line-height: 30px;
}

li:hover {
  background-color: #f2f2f2;
  cursor: move;
}
</style>
