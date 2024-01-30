<!-- @format -->

<script setup lang="ts">
import CatTree from "@/components/CatTree.vue";
import ContentList from "@/components/ContentList.vue";
import RuleExplorer from "@/components/RuleExplorer.vue";
import {useAppStore} from "@/stores/appStore";
import AppendDialog from "@/components/AppendDialog.vue";

const appStore = useAppStore();
</script>

<template>
  <div class="container">
    <header>
      <button @click="appStore.showDialog()">新增待分类内容</button>
    </header>
    <main>
      <!-- 左栏 -->
      <aside class="left-block">
        <ContentList />
      </aside>
      <!-- 右栏 -->
      <aside class="right-block">
        <!-- 右上栏 -->
        <section>
          <CatTree />
        </section>
        <!-- 右下栏 -->
        <section>
          <RuleExplorer/>
        </section>
      </aside>
    </main>
  </div>
  <AppendDialog/>
</template>

<style scoped>
.container {
  height: 100%;
}
header {
 height: 6%;
 background-color: rgb(128, 128, 128);
}
main {
  height: 94%;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.right-block {
  display: grid;
  grid-template-rows: 1fr 1fr;
}
</style>
