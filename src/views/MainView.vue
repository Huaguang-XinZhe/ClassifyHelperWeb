<!-- @format -->

<script setup lang="ts">
import CatTree from "@/components/CatTree.vue";
import ContentList from "@/components/ContentList.vue";
import RuleExplorer from "@/components/RuleExplorer.vue";
import { useAppStore } from "@/stores/appStore";
import AppendDialog from "@/components/AppendDialog.vue";

const appStore = useAppStore();
</script>

<template>
  <el-container class="container">
    <el-header>
      <button @click="appStore.showDialog()">新增待分类内容</button>
    </el-header>
    <el-main>
      <!-- 左栏 -->
      <ContentList />
      <!-- 右栏 -->
      <div class="right-block">
        <!-- 右上栏 -->
        <CatTree />
        <!-- 右下栏 -->
        <RuleExplorer />
      </div>
    </el-main>
  </el-container>
  <AppendDialog />
</template>

<style scoped>
.el-container {
  width: 100vw;
  height: 100vh;
}

.el-header {
  height: 6vh;
}

.el-main {
  height: 94vh;
  display: flex;
}
.right-block {
  width: 50%;
  height: 100%;
}
</style>
