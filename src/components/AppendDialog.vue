<script setup lang="ts">
import InputProcessor from "@/components/InputProcessor.vue";
import {useAppStore} from "@/stores/appStore";

const appStore = useAppStore();
</script>

<template>
  <el-dialog v-model="appStore.dialogVisible" title="新增待分类内容">
    <InputProcessor/>
  </el-dialog>
</template>

<style scoped>

</style>