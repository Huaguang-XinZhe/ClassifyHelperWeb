import { defineStore } from "pinia";
import { computed, shallowReactive } from "vue";
import type { Input } from "@/types";

export const useInputStore = defineStore("input", () => {
  // 所有的记录数据（浅响应式，以触发 computed）
  const allInputs = shallowReactive<Input[]>([]);

  // 未分类的记录数据（筛选那些没有 tags 的记录）
  const unclassifiedInputs = computed(() => {
    return allInputs.filter((input) => !input.tags);
  });

  // 上次输入列表中的最大id
  let lastMaxId = 0;

  function setAllInputs(list: Input[]) {
    lastMaxId = list.length;
    allInputs.push(...list);
  }

  // 根据 id 批量更新 allInputs 中的数据
  function updateAllInputs(newInputs: Input[]) {
    for (const newInput of newInputs) {
      const index = allInputs.findIndex((input) => input.id === newInput.id);
      if (index !== -1) {
        allInputs.splice(index, 1, newInput);
      }
    }
  }

  // 根据 id 删除 allInputs 中的单个 Input 对象
  function deleteInput(id: number) {
    const index = allInputs.findIndex((input) => input.id === id);
    if (index !== -1) {
      allInputs.splice(index, 1);
    }
  }

  return {
    setAllInputs,
    deleteInput,
    updateAllInputs,
    unclassifiedInputs,
  };
});
