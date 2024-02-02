import type { Input } from "@/types";
import { ElMessage } from "element-plus";
import { useVditorStore } from "@/stores/vditorStore";
import { useCategorizerStore } from "@/stores/categorizerStore";
import { useInputStore } from "@/stores/inputStore";
import useCategorizer from "@/test/categorizer-refactor/useCategorizer";

const { getVditorValue, setVditorValue } = useVditorStore();
const { hideCategorizer } = useCategorizerStore();
const { deleteInput, updateAllInputs } = useInputStore();
let {
  currentIndex,
  currentInput,
  classInput,
  classInputStart,
  currentIndexStart,
  updatedInputs,
  copyInputs,
  classRef,
} = useCategorizer();

function updateInput(newInput: Input) {
  const index = copyInputs.value.findIndex((input) => input.id === newInput.id);
  if (index !== -1) {
    copyInputs.value.splice(index, 1, newInput);
  }
}

// 切换内容
const setCurrentContentToVditor = () => {
  setVditorValue(currentInput.value.content);
};

// 从 currentInput 上取下类属（没有的话就返回空字符串）
const getOriginalClass = () => {
  return currentInput.value.tags?.join("-") ?? "";
};

// 延迟全选
const selectDelay = () => {
  setTimeout(() => {
    classRef.value?.select();
  }, 50);
};

const previousBefore = () => {
  // 在第一次回滚时，记下当前的类属和索引
  if (!classInputStart) {
    classInputStart = classInput.value;
    currentIndexStart = currentIndex.value;
  }
  // 切换到前一个内容
  currentIndex.value--;
};

const previous = () => {
  previousBefore();
  setCurrentContentToVditor();
  // 还原类属输入
  // ?? 是空值合并运算符，如果前面的值是 null 或 undefined，就会取后面的值
  classInput.value = getOriginalClass();
  // 全选类属输入
  selectDelay();
};

const checkOnNextBefore = () => {
  // 拿到类属输入框的当前值
  const trimClassInput = classInput.value.trim();
  // console.log("trimClassInput", trimClassInput);
  if (!trimClassInput) return false; // 没有输入类属，返回

  // 当前 Input 对象的原类属
  const originalClass = getOriginalClass();
  // console.log("originalClass", originalClass);
  // 可能没有原类属，所以一定要在有的情况下比较，不能没有就直接返回 false
  if (originalClass && originalClass === trimClassInput) return false; // 类属没有变化，返回

  // 拿到 Vditor 编辑器中的当前值
  const vditorValue = getVditorValue();
  // console.log("vditorValue", vditorValue);
  // 当前 Input 对象的原内容
  const originalContent = currentInput.value.content;
  // console.log("originalContent", originalContent);
  // 要没获取到也更，更总比不更保险一些
  if (vditorValue && vditorValue === originalContent) return false; // 内容没有变化，返回

  return true;
};

// 细化切换的生命周期
// 切换之前，主要做些存档工作
const nextBefore = () => {
  // 通过后就执行更新、存档
  if (checkOnNextBefore()) {
    // 有类属，那就根据当前输入创建一个新的 Input 对象
    const newInput: Input = {
      id: currentInput.value.id,
      content: getVditorValue() ?? currentInput.value.content,
      tags: classInput.value.split("-"),
    };
    // 记录这个更新对象
    updatedInputs.push(newInput);
    // 然后更新 copyInputs 中对应的 Input 对象
    updateInput(newInput);
  }

  console.log("自增前", currentIndex.value);
  // 校验、存档完成，索引 + 1，执行切换
  currentIndex.value++;
  console.log("自增后", currentIndex.value);
};

const next = () => {
  console.log("next");
  nextBefore();

  if (currentIndex.value >= copyInputs.value.length) {
    // 没有下一个了，后续处理
    handleEsc();
    return;
  }

  // 复现未更新、存档就向前查看的类属
  if (classInputStart && currentIndex.value === currentIndexStart) {
    classInput.value = classInputStart;
    classInputStart = "";
    currentIndexStart = 0;
  } else {
    // 只要能从 Input 对象上获取到原有的类属，就填充到类属输入框中
    classInput.value = getOriginalClass();
  }

  // 全选类属输入
  selectDelay();

  // 编辑器应用新内容
  setCurrentContentToVditor();
};

const handleEsc = () => {
  if (updatedInputs.length === 0) {
    ElMessage.warning("你是啥都没做呢😥");
    close();
    return;
  }
  // 实际更新 Inputs（动 allInputs 里边的数据）
  updateAllInputs(updatedInputs);
  // 提示
  ElMessage.success(`太棒了！👍你已经类属 ${updatedInputs.length} 项了`);
  // 重置一些状态
  currentIndex.value = 0;
  updatedInputs.length = 0;
  // 关闭
  close();
};

const handleDelete = () => {
  // 删除当前的 Input 对象
  copyInputs.value.splice(currentIndex.value, 1);
  // 删除 allInputs 中对应的 Input 对象
  deleteInput(currentInput.value.id);
  // 提示
  ElMessage.success("走你😜");
  // 当前索引 -1
  currentIndex.value--;
  // 在有回退前存档的情况下，存档索引也应该 -1
  if (classInputStart) {
    currentIndexStart--;
  }
  // 删除后，如果还有下一个，就切换到下一个
  if (currentIndex.value < copyInputs.value.length) {
    next();
  } else {
    // 否则就关闭
    handleEsc();
  }
};

const close = () => {
  // e.preventDefault();
  console.log("close");
  hideCategorizer();
};

export default {
  close,
  previous,
  next,
  handleEsc,
  handleDelete,
};
