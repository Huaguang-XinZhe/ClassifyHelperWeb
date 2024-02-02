import { defineStore } from "pinia";
import { computed } from "vue";
import { Tree } from "@/tree";

export const useTreeStore = defineStore("tree", () => {
  // 创建一个 tree 实例
  const tree = new Tree();

  // 类属树所依赖的数据
  const catData = computed(() => {
    // 按 count 降序排列
    // 注意！计算属性包在 `{}` 里边的逻辑必须 return，否则就是 undefined
    tree.root.sort((node1, node2) => node2.count - node1.count);
    // 直接在以上代码上 return 不会返回预期的结果，还是排序之前的 root，但是在这里 return 就可以返回排序之后的 root
    return tree.root;
  });

  // 添加节点
  function addNodes(tagsArr: string[][]) {
    for (const tags of tagsArr) {
      tree.addNodes(tags);
    }
  }

  return {
    catData,
    addNodes,
  };
});
