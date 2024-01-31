import type { Input, Result } from "@/types";
import axios from "axios";
import { ElMessage } from "element-plus";

export function useInputProcessor() {
  function matchTagGroup(input: string): string | null {
    const regex = /(?:^| )#([^,*^#\n]+?)\r?\n/gm;
    const matchResult = regex.exec(input);
    return matchResult && matchResult[1];
  }

  const parseInput = (value: string) => {
    return value.split(/^--/gm).map((item, index) => {
      const tagGroup = matchTagGroup(item);
      return tagGroup
        ? {
            id: index + 1,
            content: item.replace(`#${tagGroup}`, "").trim(),
            tags: tagGroup.split("-"),
          }
        : {
            id: index + 1,
            content: item.trim(),
          };
    });
  };

  const extractTagsArr = (inputList: Input[]) => {
    // 类型推断不出来，需要手动断言
    return inputList.map((item) => item.tags).filter(Boolean) as string[][];
  };

  // 用 axios 发起一个网络请求，传输 inputList
  const postInputList = async (inputList: Input[]) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/inputs",
        inputList,
      );
      const result: Result = response.data;
      if (!result.code) {
        ElMessage.error(result.msg);
      }
    } catch (error) {} // 有全局异常处理器捕获
  };

  return {
    parseInput,
    extractTagsArr,
    postInputList,
  };
}
