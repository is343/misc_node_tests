class TreeNode {
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  value: number;
  constructor(value) {
    this.value = value;
  }
}

class BinarySearchTree {
  count = 0;
  root: TreeNode;
  constructor(value: number) {
    this.root = new TreeNode(value);
    this.count++;
  }

  size = () => this.count;

  insert = value => {
    this.count++;
    const newNode = new TreeNode(value);

    const searchTree = (node: TreeNode) => {
      if (value < node.value) {
        if (!node.left) {
          node.left = newNode;
        } else {
          searchTree(node.left);
        }
      } else if (value > node.value) {
        if (!node.right) {
          node.right = newNode;
        } else {
          searchTree(node.right);
        }
      }
    };
    searchTree(this.root);
  };

  min = () => {
    let currentNode = this.root;
    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode.value;
  };

  max = () => {
    let currentNode = this.root;
    while (currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode.value;
  };

  contains = (value: number) => {
    let currentNode = this.root;
    while (currentNode) {
      if (currentNode.value === value) {
        return true;
      } else if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return false;
  };

  minHeight = (node: TreeNode = this.root) => {
    if (node === null) {
      return -1;
    }
    const left = this.minHeight(node.left);
    const right = this.minHeight(node.right);
    if (left < right) {
      return left + 1;
    } else {
      return right + 1;
    }
  };

  maxHeight = (node: TreeNode = this.root) => {
    if (node === null) {
      return -1;
    }
    const left = this.maxHeight(node.left);
    const right = this.maxHeight(node.right);
    if (left > right) {
      return left + 1;
    } else {
      return right + 1;
    }
  };

  isBalanced = () => this.minHeight() >= this.maxHeight() - 1;

  inOrder = () => {
    if (this.root === null) {
      return;
    }
    const result: number[] = [];
    const transverseInOrder = (node: TreeNode) => {
      node.left && transverseInOrder(node.left);
      result.push(node.value);
      node.right && transverseInOrder(node.right);
    };
    transverseInOrder(this.root);
    return result;
  };

  /** numerically in order */
  inOrderCheck = (valueList: number[]): boolean => {
    if (this.root === null) {
      return false;
    }
    const values = [...valueList];
    const transverseInOrder = (node: TreeNode) => {
      node.left && transverseInOrder(node.left);
      if (values.length && node.value !== values[0]) {
        return false;
      }
      values.shift();
      node.right && transverseInOrder(node.right);
    };
    transverseInOrder(this.root);
    return !values.length;
  };

  /** nodes first, then leaves */
  preOrder = () => {
    if (this.root === null) {
      return;
    }
    const result: number[] = [];
    const transversePreOrder = (node: TreeNode) => {
      result.push(node.value);
      node.left && transversePreOrder(node.left);
      node.right && transversePreOrder(node.right);
    };
    transversePreOrder(this.root);
    return result;
  };

  /** leaves first, then nodes */
  postOrder = () => {
    if (this.root === null) {
      return;
    }
    const result: number[] = [];
    const transversePostOrder = (node: TreeNode) => {
      node.left && transversePostOrder(node.left);
      node.right && transversePostOrder(node.right);
      result.push(node.value);
    };
    transversePostOrder(this.root);
    return result;
  };

  /** breadth first search */
  levelOrder = () => {
    if (this.root === null) {
      return;
    }
    const result: number[] = [];
    const queue: TreeNode[] = [];
    queue.push(this.root);
    while (queue.length) {
      const node = queue.shift();
      result.push(node.value);
      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }
    return result;
  };
}

const bst = new BinarySearchTree(5);
bst.insert(3);
bst.insert(9);
bst.insert(2);
console.log('bst.isBalanced()', bst.isBalanced());
bst.insert(1);
bst.insert(11);
console.log('bst.size()', bst.size());
console.log('bst.min()', bst.min());
console.log('bst.max()', bst.max());
console.log('bst.contains(7)', bst.contains(7));
console.log('bst.contains(5)', bst.contains(5));
console.log('bst.minHeight()', bst.minHeight());
console.log('bst.maxHeight()', bst.maxHeight());
console.log('bst.isBalanced()', bst.isBalanced());
console.log('bst.inOrder()', bst.inOrder());
console.log('bst.preOrder()', bst.preOrder());
console.log('bst.postOrder()', bst.postOrder());
console.log('bst.levelOrder()', bst.levelOrder());
const bst2 = new BinarySearchTree(1);
bst2.insert(2);
bst2.insert(3);
bst2.insert(5);
bst2.insert(9);
bst2.insert(11);
const bstOrder = bst.inOrder();
const bst2Order = bst2.inOrder();
console.log('bstOrder', bstOrder);
console.log('bst2Order', bst2Order);
console.log('bst2.inOrderCheck(bstOrder)', bst2.inOrderCheck(bstOrder));

console.log('equals', JSON.stringify(bstOrder) === JSON.stringify(bst2Order));
