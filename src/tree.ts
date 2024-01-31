export class MyNode {
  label: string;
  count: number;
  children: MyNode[];

  constructor(tag: string) {
    this.label = tag;
    this.count = 1;
    this.children = [];
  }
}

export class Tree {
  root: MyNode[];

  constructor() {
    this.root = [];
  }

  addNodes(tags: string[]) {
    let current: MyNode[] = this.root;

    for (const tag of tags) {
      let foundNode = current.find((node) => node.label === tag);

      if (!foundNode) {
        const newNode: MyNode = new MyNode(tag);
        current.push(newNode);
        foundNode = newNode;
      } else {
        foundNode.count++;
      }

      current = foundNode.children;
    }
  }

  updateNode(oldLabel: string, newLabel: string) {
    const nodeToUpdate = this.findNode(oldLabel);
    if (nodeToUpdate) {
      nodeToUpdate.label = newLabel;
    }
  }

  removeNode(label: string) {
    function removeNodeRecursive(nodes: MyNode[], label: string): boolean {
      const index = nodes.findIndex((node) => node.label === label);
      if (index !== -1) {
        nodes.splice(index, 1);
        return true;
      }

      for (const node of nodes) {
        if (removeNodeRecursive(node.children, label)) {
          return true;
        }
      }

      return false;
    }

    return removeNodeRecursive(this.root, label);
  }

  findNode(label: string): MyNode | undefined {
    function findNodeRecursive(
      nodes: MyNode[],
      label: string,
    ): MyNode | undefined {
      for (const node of nodes) {
        if (node.label === label) {
          return node;
        }
        // 内部函数的 return 不会直接退出外部函数的执行！所以这里必须要用一个变量接着，然后在外部函数中 return。
        const found = findNodeRecursive(node.children, label);
        if (found) {
          return found;
        }
      }
    }

    return findNodeRecursive(this.root, label);
  }
}

// // 创建树实例
// const tree = new Tree();
//
// // 添加路径
// tree.addNodes(["公司", "技术部", "软件开发组"]);
// tree.addNodes(["公司", "技术部", "硬件开发组"]);
// tree.addNodes(["公司", "市场部"]);
// tree.addNodes(["公司", "人力资源部"]);
//
// // 打印初始树结构
// console.log("初始树结构：", JSON.stringify(tree, null, 2));
//
// // 更新节点
// tree.updateNode("市场部", "营销部");
//
// // 删除节点
// tree.removeNode("硬件开发组");
//
// // 打印修改后的树结构
// console.log("修改后的树结构：", JSON.stringify(tree, null, 2));
//
// // 查询节点
// const foundNode = tree.findNode("软件开发组");
// console.log(
//   "查询结果：",
//   foundNode ? JSON.stringify(foundNode, null, 2) : "未找到节点",
// );
