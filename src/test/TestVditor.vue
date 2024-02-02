<script setup lang="ts">
import { onMounted } from "vue";
import "vditor/dist/index.css";
import { useAppStore } from "@/stores/appStore";

// const vditor = ref<Vditor | null>(null);
const appStore = useAppStore();
const initialContent = `
**未分类**：

- 加图标；❌

- hover 不显示删除按钮；👌
- 禁止拖动；👌
- +：禁止在内部放置；👌

**默认加载**：

- 更新 hover 样式，加一个三点图标，点击显示菜单；
- 点击后设置 defaultLoad；
- onMounted 时读取 defaultLoad，并将 currentTitle 指向它；
- onMounted 时置顶，设为默认加载时置顶；

--

限制类属树的层级为 3 级，3 级类项禁止被内放置；

--

\`\`\`css
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
\`\`\`

这个 filter 是什么？怎么能实现那么好看的效果？

--

![image-20240124211712489](https://image-bed-1315938829.cos.ap-nanjing.myqcloud.com/image-20240124211712489.png)
`;

onMounted(() => {
  // vditor.value = new Vditor("vditor", {
  //   width: "70%",
  //   toolbar: [],
  //   toolbarConfig: {
  //     hide: true,
  //   },
  //   after: () => {
  //     // vditor.value is a instance of Vditor now and thus can be safely used here
  //     vditor.value!.setValue(initialContent);
  //   },
  // });
  appStore.initializeVditor(initialContent);
});
</script>

<template>
  <!--  按官方 Demo 说的来，这里就是用 id，不是 ref！-->
  <div class="container">
    我是容器
    <div id="vditor"></div>
  </div>
</template>

<style scoped></style>
