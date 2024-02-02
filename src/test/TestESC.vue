<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const inputRef = ref(null);

// const handleKeydown = (e: KeyboardEvent) => {
//   if (e.key === "Escape") {
//     e.preventDefault();
//     e.stopPropagation();
//     // 手动重新聚焦到输入框
//     inputRef.value?.focus();
//     console.log("ESC pressed, default behavior prevented");
//   }
// };

// 好奇怪呀，这个 ESC 按键在 Chrome 里边没用，但在 Firefox 却能正常工作，可能是受浏览器的和其他插件的影响！
// 测试发现，是受到了 Vimium C 插件的影响！
// const handleEsc = (e: KeyboardEvent) => {
//   // e.preventDefault();
//   console.log("handleEsc");
// };

const handleGlobalKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    console.log("ESC pressed");
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleGlobalKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleGlobalKeydown);
});
</script>

<template>
  <!--  <input type="text" @keydown.stop="handleEsc" ref="inputRef" />-->
  <input type="text" />
</template>

<style scoped></style>
