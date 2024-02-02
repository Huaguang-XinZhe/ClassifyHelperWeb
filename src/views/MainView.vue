<!-- @format -->

<script setup lang="ts">
import CatTree from "@/components/CatTree.vue";
import ContentList from "@/components/ContentList.vue";
import RuleExplorer from "@/components/RuleExplorer.vue";
import { useAppStore } from "@/stores/appStore";
import AppendDialog from "@/components/AppendDialog.vue";
import ImmersiveCategorizer from "@/components/ImmersiveCategorizer.vue";
import { useCategorizerStore } from "@/stores/categorizerStore";
import { computed, toRef } from "vue";
import { useInputStore } from "@/stores/inputStore";

const appStore = useAppStore();
const inputStore = useInputStore();
const { categorizerVisible, showCategorizer } = useCategorizerStore();

// 控制 “进入沉浸式分类” 按钮的显隐
const showCategorizerButtonVisible = computed(() => {
  return toRef(inputStore, "unclassifiedInputs").value.length > 0;
});
</script>

<template>
  <!--  如果沉浸式模态框显示，主界面就隐藏-->
  <el-container class="container" v-show="!categorizerVisible">
    <el-header>
      <button @click="appStore.showDialog()">新增待分类内容</button>
      <button @click="showCategorizer()" v-show="showCategorizerButtonVisible">
        沉浸式分类
      </button>
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
  <!--  虽然它不显示，也没有 Dom 结构（v-if），但依然会挂载-->
  <ImmersiveCategorizer />
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
