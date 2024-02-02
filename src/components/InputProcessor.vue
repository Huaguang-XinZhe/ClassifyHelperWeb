<!-- @format -->

<script setup lang="ts">
import { UploadFilled } from "@element-plus/icons-vue";
import { computed, ref } from "vue";
import type { UploadProps } from "element-plus";
import { ElInput, ElMessage } from "element-plus";
import { useAppStore } from "@/stores/appStore";
import { useRouter } from "vue-router";
import { useInputProcessor } from "@/hooks/useInputProcessor";
import type { Input } from "@/types";

const radio = ref("文件读取");
const input = ref("");
const appStore = useAppStore();
const router = useRouter();
const { parseInput, extractTagsArr, postInputList } = useInputProcessor();
const upload = computed(() => {
  return radio.value === "文件读取";
});

const beforeUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.size / 1024 > 500) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  } else {
    const reader = new FileReader();
    reader.onload = (e) => {
      // 这里的 e 是 ProgressEvent
      console.log(e);
      // console.log(e.target);
      // console.log(e.target?.result);
    };
    reader.readAsText(rawFile);
    // return false;
    return true;
  }
};

const handleClick = () => {
  if (!input.value) {
    ElMessage.warning("没点输入你就想走？👀😜");
    return;
  }

  const allInputs = parseInput(input.value);
  const tagsArr = extractTagsArr(allInputs);

  appStore.setAllInputs(allInputs);
  appStore.addNodes(tagsArr);

  navigateAndThen(allInputs);
};

function navigateAndThen(inputList: Input[]) {
  router
    .push("/main")
    .then(() => {
      // 跳转成功
      // 发起 post 请求
      postInputList(inputList);
      // 初始化 Vditor
      // appStore.initializeVditor("");
    })
    .catch((error) => {
      ElMessage.error("跳转失败", error.message);
    });
}

// ElInput 的引用
const textareaRef = ref<InstanceType<typeof ElInput>>();

const handleChange = (val: string) => {
  // console.log(val);
  // 如果切换到 “粘贴文本” 一项，就自动聚焦到文本域
  if (val === "粘贴文本") {
    textareaRef.value?.focus();
  }
};
</script>

<template>
  <el-radio-group v-model="radio" @change="handleChange">
    <el-radio-button label="文件读取" />
    <el-radio-button label="粘贴文本" />
  </el-radio-group>
  <!--  这里的 before-upload 不能用 @，没效果！-->
  <!--
    提出来：ref="uploadRef"
   -->
  <el-upload
    v-if="upload"
    drag
    action="https://wahaha.com"
    :show-file-list="false"
    accept=".md, text/plain"
    :limit="1"
    :before-upload="beforeUpload"
    :auto-upload="false"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <!--    不能删这个类，它有绑定的样式-->
    <template #tip>
      <div class="el-upload__tip">
        只支持 .md, .txt 格式文件，且不超过 500kb
      </div>
    </template>
  </el-upload>
  <div v-else class="my-input">
    <el-input
      v-model="input"
      :autosize="{ minRows: 10, maxRows: 25 }"
      type="textarea"
      placeholder="Please input"
      ref="textareaRef"
      @keydown.ctrl.enter="handleClick"
    />
    <el-button @click="handleClick">确定</el-button>
  </div>
  <!-- <button @click="submitUpload">手动上传</button> -->
</template>

<style scoped>
.my-input {
  width: 500px;
  margin: 30px;
}
</style>
