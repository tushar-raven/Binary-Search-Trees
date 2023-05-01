const Node = (value) => {
  return { data: value || null, right: null, left: null };
};

const Tree = (array) => {
  const root = buildTree(array);

  const insert = (value, root) => {
    if (!root) {
      return Node(value);
    }
    if (root.data === value) {
      return root;
    }
    if (root.data > value) {
      root.left = insert(value, root.left);
    } else {
      root.right = insert(value, root.right);
    }
    return root;
  };

  const deleteValue = (value, root) => {
    if (root === null) {
      return root;
    }

    if (root.data > value) {
      root.left = deleteValue(value, root.left);
    } else if (root.data < value) {
      root.right = deleteValue(value, root.right);
    } else {
      if (root.left === null) {
        return root.right;
      } else if (root.right == null) {
        return root.left;
      } else {
        root.data = minValue(root.right);
        root.right = deleteValue(root.data, root.right);
      }
    }
    return root;
  };

  const minValue = (root) => {
    let minVal = root.data;
    while (root.left !== null) {
      minVal = root.left.data;
      root = root.left;
    }
    return minVal;
  };

  const find = (value, root) => {
    if (root === null) return root;

    if (root.data === value) return root;

    if (root.data < value) {
      return find(value, root.right);
    } else {
      return find(value, root.left);
    }
  };

  const levelOrder = (root, arr, queue) => {
    if (root === null) {
      return null;
    }

    arr.push(root.data);

    queue.push(root.left);
    queue.push(root.right);

    while (queue.length !== 0) {
      const level = queue.shift();
      levelOrder(level, arr, queue);
    }
    return arr;
  };

  const preOrder = (root, arr) => {
    if (root === null) {
      return null;
    }

    arr.push(root.data);

    if (root.left !== null) {
      preOrder(root.left, arr);
    }

    if (root.right !== null) {
      preOrder(root.right, arr);
    }

    return arr;
  };

  const inOrder = (root, arr) => {
    if (root === null) {
      return null;
    }

    if (root.left !== null) {
      inOrder(root.left, arr);
    }

    arr.push(root.data);

    if (root.right !== null) {
      inOrder(root.right, arr);
    }

    return arr;
  };

  const postOrder = (root, arr) => {
    if (root === null) {
      return null;
    }

    if (root.left !== null) {
      inOrder(root.left, arr);
    }

    if (root.right !== null) {
      inOrder(root.right, arr);
    }

    arr.push(root.data);

    return arr;
  };

  const height = (root) => {
    if (root === null) {
      return 0;
    }

    let lHeight = height(root.left);
    let rHeight = height(root.right);

    if (lHeight > rHeight) {
      return lHeight + 1;
    } else {
      return rHeight + 1;
    }
  };

  const Depth = (root, node, depth = 0) => {
    if (root === null || node === null) {
      return;
    }

    if (node === root) {
      return depth;
    }

    if (node.data < root.data) {
      return Depth(root.left, node, (depth += 1));
    } else {
      return Depth(root.right, node, (depth += 1));
    }
  };

  const isBalanced = (root) => {
    const lHeight = height(root.left);
    const rHeight = height(root.right);
    const diff = Math.abs(rHeight - lHeight);
    return diff > 2 ? "false" : "true";
  };

  const reBalance = (root) => {
    const arr = inOrder(root, []);
    root = buildTree(arr);
    return root;
  };

  const randomNumInsert = (root) => {
    for (let i = 0; i < 100; i++) {
      let num = Math.round(Math.random() * 1000);
      insert(num, root);
    }
    return root;
  };

  return {
    insert,
    deleteValue,
    find,
    levelOrder,
    preOrder,
    inOrder,
    postOrder,
    height,
    Depth,
    isBalanced,
    reBalance,
    randomNumInsert,
    root,
  };
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const sortArray = (array) => {
  return array.sort((a, b) => (a > b ? 1 : -1));
};

const removeDuplicates = (array) => {
  let removed = array.reduce((acc, item) => {
    if (!acc.includes(item)) acc.push(item);
    return acc;
  }, []);

  return removed;
};

const buildTree = (array) => {
  const sortedArray = sortArray(array);
  const finalArray = removeDuplicates(sortedArray);

  if (finalArray.length === 0) {
    return null;
  }
  const midPoint = Math.floor(finalArray.length / 2);
  const newNode = Node(finalArray[midPoint]);
  newNode.left = buildTree(finalArray.slice(0, midPoint));
  newNode.right = buildTree(finalArray.slice(midPoint + 1));

  return newNode;
};

const tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 324]);
console.log(tree.levelOrder(tree.root, [], []));
console.log(tree.preOrder(tree.root, []));
console.log(tree.inOrder(tree.root, []));
console.log(tree.postOrder(tree.root, []));

tree.deleteValue(9, tree.root);
console.log(tree.find(23, tree.root));
console.log(tree.height(tree.root));
console.log(tree.Depth(tree.root, tree.find(67, tree.root)));

console.log(tree.isBalanced(tree.root));

tree.randomNumInsert(tree.root);
console.log(tree.isBalanced(tree.root));

tree.root = tree.reBalance(tree.root);
console.log(tree.isBalanced(tree.root));

prettyPrint(tree.root);
