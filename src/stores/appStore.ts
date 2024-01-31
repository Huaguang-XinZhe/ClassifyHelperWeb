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
  // const treeRoot = reactive<MyNode[]>(tree.root);
  // 类属树所依赖的数据
  const catData = computed(() => {
    // 按 count 降序排列
    // 注意！计算属性包在 `{}` 里边的逻辑必须 return，否则就是 undefined
    tree.root.sort((node1, node2) => node2.count - node1.count);
    // 直接在以上代码上 return 不会返回预期的结果，还是排序之前的 root，但是在这里 return 就可以返回排序之后的 root
    return tree.root;
  });

  // 这么写的话，那打印出来的 catData 就是一个响应式对象，而且有个问题，就是改变树的结构不会引起 catData 里边的值的变化！
  // const catData = computed(() => {
  //   return treeRoot.sort((node1, node2) => node2.count - node1.count);
  // });

  // 在这里也监视不到任何变化！
  // watch(
  //   () => catData.value,
  //   (newVal) => {
  //     console.log("catData changed: ");
  //   },
  // );

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
