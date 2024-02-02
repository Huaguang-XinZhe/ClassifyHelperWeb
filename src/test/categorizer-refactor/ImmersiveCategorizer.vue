<script setup lang="ts">
import { onMounted, watch } from "vue";
import { Delete } from "@element-plus/icons-vue";
import { useVditorStore } from "@/stores/vditorStore";
import { useCategorizerStore } from "@/stores/categorizerStore";
import useCategorizer from "@/test/categorizer-refactor/useCategorizer";
import categorizerEvents from "@/test/categorizer-refactor/categorizerEvents";
import { storeToRefs } from "pinia";

const { initializeVditor } = useVditorStore();
const { categorizerVisible } = storeToRefs(useCategorizerStore());
const { currentIndex, currentInput, rightShow, classRef, classInput } =
  useCategorizer();
const { close, previous, next, handleEsc, handleDelete } = categorizerEvents;

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
          @keydown.shift.enter="previous"
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
