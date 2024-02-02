import { defineStore } from "pinia";
import { computed, ref, shallowReactive } from "vue";
import type { Input } from "@/types";
import { Tree } from "@/tree";
import Vditor from "vditor";
// 千万别忘了 CSS！！！否则无法正常交互！
import "vditor/dist/index.css";
import { ElMessage } from "element-plus";

export const useAppStore = defineStore("app", () => {
  const dialogVisible = ref(false);
  // 控制沉浸式分类器的显示与隐藏
  const categorizerVisible = ref(false);
  // 所有的记录数据（浅响应式，以触发 computed）
  const allInputs = shallowReactive<Input[]>([]);
  const vditor = ref<Vditor | null>(null);
  // 未分类的记录数据（筛选那些没有 tags 的记录）
  const unclassifiedInputs = computed(() => {
    return allInputs.filter((input) => !input.tags);
  });
  // 控制 “进入沉浸式分类” 按钮的显隐
  const showCategorizerButtonVisible = computed(() => {
    // 有 vditor 实例并且有未分类的记录
    return vditor && unclassifiedInputs.value.length > 0;
  });

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

  // 根据 id 批量更新 allInputs 中的数据
  function updateAllInputs(newInputs: Input[]) {
    for (const newInput of newInputs) {
      const index = allInputs.findIndex((input) => input.id === newInput.id);
      if (index !== -1) {
        allInputs.splice(index, 1, newInput);
      }
    }
  }

  // 根据 id 更新 allInputs 中的单个 Input 对象
  // function updateInput(newInput: Input) {
  //   const index = allInputs.findIndex((input) => input.id === newInput.id);
  //   if (index !== -1) {
  //     allInputs.splice(index, 1, newInput);
  //   }
  // }

  // 根据 id 删除 allInputs 中的单个 Input 对象
  function deleteInput(id: number) {
    const index = allInputs.findIndex((input) => input.id === id);
    if (index !== -1) {
      allInputs.splice(index, 1);
    }
  }

  // 初始化 Vditor
  const initializeVditor = (initialContent: string) => {
    vditor.value = new Vditor("vditor", {
      height: 300,
      toolbar: [],
      toolbarConfig: {
        hide: true,
      },
      after: () => {
        ElMessage.success("Vditor 初始化成功！");
        vditor.value!.setValue(initialContent);
      },
    });
  };

  // 给 Vditor 设值
  const setVditorValue = (content: string) => {
    vditor.value?.setValue(content);
  };

  // 获取 Vditor 的当前值
  const getVditorValue = () => {
    return vditor.value?.getValue();
  };

  const showCategorizer = () => {
    console.log("showCategorizer");
    categorizerVisible.value = true;
  };

  const hideCategorizer = () => {
    console.log("hideCategorizer");
    categorizerVisible.value = false;
  };

  // 添加节点
  function addNodes(tagsArr: string[][]) {
    for (const tags of tagsArr) {
      tree.addNodes(tags);
    }
  }

  const showDialog = () => {
    dialogVisible.value = true;
  };

  function setAllInputs(list: Input[]) {
    lastMaxId = list.length;
    allInputs.push(...list);
  }

  return {
    dialogVisible,
    showDialog,
    unclassifiedInputs,
    setAllInputs,
    catData,
    addNodes,
    categorizerVisible,
    showCategorizer,
    hideCategorizer,
    initializeVditor,
    vditor,
    setVditorValue,
    getVditorValue,
    // updateInput,
    updateAllInputs,
    deleteInput,
    showCategorizerButtonVisible,
  };
});
