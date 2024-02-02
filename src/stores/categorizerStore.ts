import { defineStore } from "pinia";
import { ref } from "vue";

export const useCategorizerStore = defineStore("categorizer", () => {
  // 控制沉浸式分类器的显示与隐藏
  const categorizerVisible = ref(false);

  const showCategorizer = () => {
    console.log("showCategorizer");
    categorizerVisible.value = true;
  };

  const hideCategorizer = () => {
    console.log("hideCategorizer");
    categorizerVisible.value = false;
  };

  return {
    categorizerVisible,
    showCategorizer,
    hideCategorizer,
  };
});
