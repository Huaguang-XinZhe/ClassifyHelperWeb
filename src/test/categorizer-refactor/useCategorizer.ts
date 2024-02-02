import { computed, ref } from "vue";
import type { Input } from "@/types";
import { useInputStore } from "@/stores/inputStore";

export default function useCategorizer() {
  // 解构出未分类列表，非响应式
  const { unclassifiedInputs } = useInputStore();

  // 维护一个索引（响应式），用于切换到下一个或上一个内容
  let currentIndex = ref(0);
  // 拷贝一个未分类列表（它必须得是响应式属性，要不然重新进入沉浸式类属后不会变化）
  const copyInputs = computed(() => unclassifiedInputs);
  // 维护一个更新列表，记录已更新的 Input 对象
  const updatedInputs: Input[] = [];
  // 类属输入
  const classInput = ref("");
  const classRef = ref<HTMLInputElement | null>(null);
  // 开始回滚时，当前类属输入框的值
  let classInputStart = "";
  // 回滚开始时的索引（必须要索引，否则只要一切换到下一个 classInputStart 就被消耗了）
  let currentIndexStart = 0;

  // 一个一个取，从未分类数组中取出来的当前 Input 对象（计算属性）
  const currentInput = computed(() => {
    return copyInputs.value[currentIndex.value];
  });
  const rightShow = computed(() => {
    // 最后一个不显示右箭头
    return currentIndex.value < copyInputs.value.length - 1;
  });

  return {
    currentIndex,
    copyInputs,
    updatedInputs,
    currentInput,
    rightShow,
    classInputStart,
    currentIndexStart,
    classInput,
    classRef,
  };
}
