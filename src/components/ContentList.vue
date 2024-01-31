<!-- @format -->

<script setup lang="ts">
// 列表数据，包括 id 和 content
import { reactive } from "vue";
import { useAppStore } from "@/stores/appStore";

const appStore = useAppStore();
const inputList = appStore.inputList;
</script>

<template>
  <ul class="container">
    <li v-for="input in inputList" :key="input.id">
      {{ input.content }}
    </li>
  </ul>
</template>

<style scoped>
.container {
  background-color: skyblue;
  height: 100%;
}
</style>
