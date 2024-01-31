import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import type { Input } from "@/types";
import { Tree } from "@/tree";

export const useAppStore = defineStore("app", () => {
  const dialogVisible = ref(false);
  const inputList = reactive<Input[]>([]);
  // 上次输入列表中的最大id
  let lastMaxId = 0;
  // 创建一个 tree 实例
  const tree = new Tree();
  // 类属树所依赖的数据
  const catData = computed(() => tree.root);

  // 添加节点
  function addNodes(tagsArr: string[][]) {
    for (const tags of tagsArr) {
      tree.addNodes(tags);
    }
  }

  const showDialog = () => {
    dialogVisible.value = true;
  };

  function setInputList(list: Input[]) {
    lastMaxId = list.length;
    inputList.push(...list);
  }

  return {
    dialogVisible,
    showDialog,
    inputList,
    setInputList,
    catData,
    addNodes,
  };
});
