<!-- @format -->

<script setup lang="ts">
// 模拟的规则数据
import { reactive, ref } from "vue";

const rules = reactive(["rule 1", "rule 2", "rule 3", "rule 4", "rule 5"]);
const input = ref("");
</script>

<template>
  <!--  这里不要用 container，会受到 MainView 中 container 影响-->
  <div class="rule-block">
    <ul>
      <li v-for="rule in rules">{{ rule }}</li>
    </ul>
    <input type="text" v-model="input" /><button>发送</button>
  </div>
</template>

<style scoped>
.rule-block {
  background-color: lightgoldenrodyellow;
  height: 20%;
  text-align: center;
}

li {
  list-style: none;
}
</style>
