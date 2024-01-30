<!-- @format -->

<script setup lang="ts">
import {UploadFilled} from "@element-plus/icons-vue";
import {computed, ref} from "vue";

const radio = ref("文件读取");
const input = ref("");
const upload = computed(() => {
  return radio.value === "文件读取";
});
</script>

<template>
  <el-radio-group v-model="radio">
    <el-radio-button label="文件读取" />
    <el-radio-button label="粘贴文本" />
  </el-radio-group>
  <el-upload
      v-if="upload"
      class="upload-demo"
      drag
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      multiple
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>
  <el-input
      v-else
      v-model="input"
      class="my-input"
      :autosize="{minRows: 10, maxRows: 25}"
      type="textarea"
      placeholder="Please input"
  />
</template>

<style scoped>
.my-input {
  width: 500px;
  margin: 30px;
}
</style>
