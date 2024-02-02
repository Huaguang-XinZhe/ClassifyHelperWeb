import { defineStore } from "pinia";
import Vditor from "vditor";
// 千万别忘了 CSS！！！否则无法正常交互！
import "vditor/dist/index.css";
import { ref } from "vue";
import { ElMessage } from "element-plus";

export const useVditorStore = defineStore("vditor", () => {
  const vditor = ref<Vditor | null>(null);

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

  return {
    initializeVditor,
    setVditorValue,
    getVditorValue,
  };
});
