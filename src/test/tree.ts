/** @format */
type MyNode = TreeNodeJSON;

interface TreeNodeJSON {
  label: string;
  count: number;
  children: TreeNodeJSON[];
}

class TreeNode {
  key: string;
  count: number;
  children: Map<string, TreeNode>;

  constructor(key: string) {
    this.key = key;
    this.count = 1;
    this.children = new Map();
  }

  toJSON(): TreeNodeJSON {
    return {
      label: this.key,
      count: this.count,
      children: Array.from(this.children.values()).map((child) =>
        child.toJSON(),
      ),
    };
  }
}

class Tree {
  root: Map<string, TreeNode>;

  constructor() {
    this.root = new Map();
  }

  addPath(path: string[]) {
    let current = this.root;

    for (const key of path) {
      if (!current.has(key)) {
        current.set(key, new TreeNode(key));
      } else {
        current.get(key)!.count++;
      }

      current = current.get(key)!.children;
    }
  }

  toJSON(): TreeNodeJSON[] {
    return Array.from(this.root.values()).map((node) => node.toJSON());
  }
}

// 测试数据和执行
// const input = [
//   "a-b-c",
//   "a-b-o",
//   "a-d-r",
//   "a-d-e",
//   "a-f-g",
//   "m-x",
//   "m-z",
//   "w",
//   "q-l",
// ];
// const tree = new Tree();
//
// for (const item of input) {
//   tree.addPath(item.split("-"));
// }
//
// console.log(JSON.stringify(tree.toJSON(), null, 2));
