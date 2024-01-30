<!-- @format -->

<script setup lang="ts">
import InputProcessor from "@/components/InputProcessor.vue";
</script>

<template>
  <div class="container">
    <h1>开始吧</h1>
    <InputProcessor />
    <RouterLink to="/main">
      <button>跳转到主页面</button>
    </RouterLink>
  </div>
</template>

<style scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
