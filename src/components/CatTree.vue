<script lang="ts" setup>
import type Node from "element-plus/es/components/tree/src/model/node";
import type { DragEvents } from "element-plus/es/components/tree/src/model/useDragNode";
import type {
  AllowDropType,
  NodeDropType,
} from "element-plus/es/components/tree/src/tree.type";
import { useAppStore } from "@/stores/appStore";

const handleDragStart = (node: Node, ev: DragEvents) => {
  // console.log("drag start", node);
};
const handleDragEnter = (
  draggingNode: Node,
  dropNode: Node,
  ev: DragEvents,
) => {
  // console.log("tree drag enter:", dropNode.label);
};
const handleDragLeave = (
  draggingNode: Node,
  dropNode: Node,
  ev: DragEvents,
) => {
  // console.log("tree drag leave:", dropNode.label);
};
const handleDragOver = (draggingNode: Node, dropNode: Node, ev: DragEvents) => {
  // console.log("tree drag over:", dropNode.label);
};
const handleDragEnd = (
  draggingNode: Node,
  dropNode: Node,
  dropType: NodeDropType,
  ev: DragEvents,
) => {
  // console.log("tree drag end:", dropNode && dropNode.label, dropType);
};
const handleDrop = (
  draggingNode: Node,
  dropNode: Node,
  dropType: NodeDropType,
  ev: DragEvents,
) => {
  // console.log("tree drop:", dropNode.label, dropType);
};
const allowDrop = (draggingNode: Node, dropNode: Node, type: AllowDropType) => {
  if (dropNode.data.label === "Level two 3-1") {
    return type !== "inner";
  } else {
    return true;
  }
};
const allowDrag = (draggingNode: Node) => {
  return !draggingNode.data.label.includes("Level three 3-1-1");
};

const appStore = useAppStore();
// const catData = appStore.catData;

// 自始自终监视不到任何变化！
// 虽然监视不到 catData 这个计算属性的变化，但通过拖动改变树的结构确实会改变 catData 的值！
// watch(
//   () => appStore.catData,
//   (newVal) => {
//     console.log("catData changed");
//   },
// );

// const handleClick = () => {
//   // 拖动改变树结构时，这两个对象里边的值都不会变化，并且打印出来都是响应式对象，即 Proxy 对象！
//   // 尽管如此，但它们确实也能正常排序，也能正常拖动。
//   console.log(appStore.catData); // 排序后的 MyNode 数组（计算属性）
//   console.log(appStore.treeRoot); // 排序前的 MyNode 数组，响应式对象
// };
</script>

<template>
  <el-tree
    class="cat-tree"
    :allow-drop="allowDrop"
    :allow-drag="allowDrag"
    :data="appStore.catData"
    draggable
    default-expand-all
    node-key="id"
    @node-drag-start="handleDragStart"
    @node-drag-enter="handleDragEnter"
    @node-drag-leave="handleDragLeave"
    @node-drag-over="handleDragOver"
    @node-drag-end="handleDragEnd"
    @node-drop="handleDrop"
  >
    <template #default="{ node, data }">
      {{ data.label }} {{ data.count > 1 ? data.count : null }}
    </template>
  </el-tree>
  <!--  <button @click="handleClick">打印此时的 catData</button>-->
</template>

<style scoped>
.el-tree {
  background-color: #f2f2f2;
  height: 80%;
  overflow: auto;
}
</style>
