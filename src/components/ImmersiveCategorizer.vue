<script setup lang="ts">
import { computed, onMounted, ref, toRef, watch } from "vue";
import type { Input } from "@/types";
import { ElMessage } from "element-plus";
import { Delete } from "@element-plus/icons-vue";
import { useVditorStore } from "@/stores/vditorStore";
import { useCategorizerStore } from "@/stores/categorizerStore";
import { useInputStore } from "@/stores/inputStore";

const { initializeVditor, getVditorValue, setVditorValue } = useVditorStore();
const categorizerStore = useCategorizerStore();
const categorizerVisible = toRef(categorizerStore, "categorizerVisible");
const { unclassifiedInputs, deleteInput, updateAllInputs } = useInputStore();

// 维护一个索引（响应式），用于切换到下一个或上一个内容
let currentIndex = ref(0);
// 拷贝一个未分类列表（它必须得是响应式属性，要不然重新进入沉浸式类属后不会变化）
const copyInputs = computed(() => unclassifiedInputs);
// 维护一个更新列表，记录已更新的 Input 对象
const updatedInputs: Input[] = [];
// 一个一个取，从未分类数组中取出来的当前 Input 对象（计算属性）
const currentInput = computed(() => {
  return copyInputs.value[currentIndex.value];
});

onMounted(() => {
  console.log("ImmersiveCategorizer mounted");
  initializeVditor(currentInput.value.content ?? "当前 Input 为空！");
  // 组件挂载后就给 Vditor 设置真正的初始值
  // setCurrentContentToVditor();
});

// 监视沉浸式模态框的显示状态，一显示就聚焦到类属输入框
watch(
  () => categorizerVisible,
  (newVal) => {
    if (newVal) {
      console.log("categorizerVisible changed to true");
      setTimeout(() => {
        classRef.value?.focus();
      }, 50);
    }
  },
);

// 类属输入
const classInput = ref("");
// 只要调用就会实例化一个 Vditor 编辑器，不管是否使用解构的 vditor
// currentInput 是一个计算 Ref，所以需要 .value

const close = () => {
  // e.preventDefault();
  console.log("close");
  categorizerStore.hideCategorizer();
};

// 切换内容
const setCurrentContentToVditor = () => {
  setVditorValue(currentInput.value.content);
};

// 根据 id 更新 copyInputs 中的单个 Input 对象
function updateInput(newInput: Input) {
  const index = copyInputs.value.findIndex((input) => input.id === newInput.id);
  if (index !== -1) {
    // 这里没有更改 copyInputs 的值，而是更改了它的元素的值，没有问题，也不会引起 unclassifiedInputs 等的变化
    copyInputs.value.splice(index, 1, newInput);
  }
}

const classRef = ref<HTMLInputElement | null>(null);
// 开始回滚时，当前类属输入框的值
let classInputStart = "";
// 回滚开始时的索引（必须要索引，否则只要一切换到下一个 classInputStart 就被消耗了）
let currentIndexStart = 0;

const previousBefore = () => {
  // 在第一次回滚时，记下当前的类属和索引
  if (!classInputStart) {
    classInputStart = classInput.value;
    currentIndexStart = currentIndex.value;
  }
  // 切换到前一个内容
  currentIndex.value--;
};

// 从 currentInput 上取下类属（没有的话就返回空字符串）
const getOriginalClass = () => {
  return currentInput.value.tags?.join("-") ?? "";
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

  // 校验、存档完成，索引 + 1，执行切换
  currentIndex.value++;
};

// 延迟全选
const selectDelay = () => {
  setTimeout(() => {
    classRef.value?.select();
  }, 50);
};

const next = () => {
  nextBefore();

  if (currentIndex.value >= copyInputs.value.length) {
    // todo： 没有下一个了，后续处理
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

const rightShow = computed(() => {
  // 最后一个不显示右箭头
  return currentIndex.value < copyInputs.value.length - 1;
});

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
</script>

<template>
  <!--  使用 teleport 传送至 body，避免 filter 等 CSS 属性影响 fixed 定位！-->
  <!--  这里居然用不得 teleport，会导致 Vditor 失效（只加载一个蹩脚的文本域）！-->
  <!--  不是 teleport 的问题，是没有引入样式！！！-->
  <teleport to="body">
    <div
      class="overlay"
      v-show="categorizerVisible"
      tabindex="0"
      @keydown.esc="handleEsc"
    >
      <div class="modal">
        <!--        <textarea class="text-area" v-model="contentInput"></textarea>-->
        <!--        <div v-html="html" contenteditable></div>-->
        <div id="vditor" @keydown.ctrl.enter="next"></div>
        <!--        <button @click="getEditorValue">获取编辑器内的值</button>-->
        <input
          class="input-line"
          type="text"
          v-model="classInput"
          ref="classRef"
          @keydown.enter="next"
        />
        <el-button
          :icon="Delete"
          type="danger"
          @click="handleDelete"
        ></el-button>

        <button
          class="arrow-button left"
          @click="previous"
          v-show="currentIndex > 0"
        >
          ←
        </button>
        <button class="arrow-button right" @click="next" v-show="rightShow">
          →
        </button>

        <button class="close-button" @click="close">X</button>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  max-width: 800px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  /*text-align: center;*/
}

.input-line {
  width: 50%;
  border: none;
  border-bottom: 1px solid black;
  font-size: 18px;
  margin-top: 50px;

  &:focus {
    outline: none;
  }
}

.arrow-button {
  position: absolute;
  top: 50%;
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid #ccc;
  width: 30px;
  height: 30px;
  cursor: pointer;

  &.left {
    left: 10px;
  }

  &.right {
    right: 10px;
  }

  &:hover {
    background-color: #f0f0f0;
  }
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #fff;
  border-radius: 10px;
  border: none;
  cursor: pointer;
}
</style>
