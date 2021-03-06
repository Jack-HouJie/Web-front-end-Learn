class TNode {
  constructor(data) {
    this.value = data
    this.left = null
    this.right = null
  }
  print () {
    console.log(this.value)
  }
  exec () {
    console.log(this.value)
  }
  save (arr) {
    arr.push(this.value)
    console.log(arr)
  }
}
class BiTree {
  constructor(node) {
    this.root = node
    this.size = 1
  }
  /* 二叉树遍历问题 */
  /** 深度优先先序遍历递归
   * @param {TNode} node 
   */
  preOrder (node) {
    if (!node) {
      return null
    }
    node.exec()
    this.preOrder(node.left)
    this.preOrder(node.right)
  }
  /** 深度优先中序遍历递归
   * @param {TNode} node 
   */
  midOrder (node) {
    if (!node) {
      return null
    }
    this.midOrder(node.left)
    node.exec()
    this.midOrder(node.right)
  }
  /** 深度优先中序遍历递归并保存
   * 
   * @param {TNode} node 开始遍历的节点
   * @param {Array} result 存储遍历结果的数组 
   */
  saveMidOrder (node, result) {
    if (!node) {
      return null
    }
    this.saveMidOrder(node.left)
    node.save(result)
    this.saveMidOrder(node.right)
  }
  /** 深度优先后序遍历递归
   * @param {TNode} node 
   */
  backOrder (node) {
    if (!node) {
      return null
    }
    this.backOrder(node.left)
    this.backOrder(node.right)
    node.exec()
  }
  /** 深度优先先序遍历非递归
   * @param {TNode} node 
   */
  preOrderNR (node) {
    // 0.鲁棒性：如果指定开始节点不存在
    if (!node) {
      return
    }
    // 1.初始化：构造辅助栈、根节点入栈
    let stack = []
    stack[0] = node
    // 2.循环：栈空时结束
    while (stack.length) {
      // 2.1栈顶节点出栈访问
      let curNode = stack.pop()
      curNode.exec()
      // 2.2右孩子存在则入栈
      if (curNode.right) {
        stack.push(curNode.right)
      }
      // 2.3左孩子存在则入栈
      if (curNode.left) {
        stack.push(curNode.left)
      }
    }
  }
  /** 深度优先中序遍历非递归*
   *  指定开始节点中序遍历
   *  0.指定开始节点不存在则返回
   *  1.构造辅助栈和当前结点设为根
   *  2.循环：待遍历树无节点 且 栈空 时结束
   *    2.1 当前节点存在时的处理，效果：当前节点及其左子树依次入栈
   *      2.1.1当前节点入栈
   *      2.1.2当前节点变为其左孩子
   *    2.2 当前节点不存在时的处理，效果：找到分支尽头后开始处理“左”“中”“右”操作
   *      2.2.1 栈顶元素出栈访问
   *      2.2.2 当前节点变为其右孩子
   * 效果：
   *  0.鲁棒性
   *  1.初始化
   *  2.循环处理所有节点
   *    2.1 当前节点及其左子树依次入栈
   *      2.1.1 当前节点入栈
   *      2.1.2 如果有左子树，下一次循环其左子树入栈
   *            如果没有左子树，下一次循环进入2.2打印一个“左”
   *    2.2 找到分支尽头后开始处理“左”“中”“右”操作
   *      2.2.1 出栈访问的节点有可能是“左”“中”“右”
   *      2.2.2 如没有右孩子：刚操作的节点作为“左”，下次循环的操作“中”（栈顶元素）
   *            如有右孩子：刚操作的节点作为第一个“中”，下次循环找到新的“左”
   */
  midOrderNR (node) {
    // 0.鲁棒性：如果指定开始节点不存在
    if (!node) {
      return
    }
    // 1.初始化：构造辅助栈、当前结点node
    let stack = []
    let curNode = node
    // 2.循环：待遍历树有节点 或 栈中有节点 时
    while (curNode || stack.length) {
      // 2.1 当前节点及其左子树依次入栈
      if (curNode) {
        // 2.1.1当前节点入栈
        stack.push(curNode)
        // 2.1.2当前节点变为其左孩子
        curNode = curNode.left
      }
      // 2.2 找到分支尽头后
      else {
        // 2.2.1 栈顶元素出栈访问
        curNode = stack.pop()
        curNode.exec()
        // 2.2.2 当前节点变为其右孩子
        curNode = curNode.right
      }
    }
  }
  /** 深度优先后序遍历非递归
   * @param {TNode} node 
   */
  backOrderNR (node) {
    // 0.如果指定开始节点不存在
    if (!node) {
      return null
    }
    // 1.初始化：根节点入栈
    let curNode = node
    let stack = [curNode]
    // 1.5 结果数组
    let result = []
    // 2.循环：栈中有节点时时
    while (stack.length) {
      // 2.1 栈顶节点出栈逆序存储
      curNode = stack.pop()
      result.unshift(curNode)
      // 2.2 左孩子存在则入栈
      if (curNode.left) {
        stack.push(curNode.left)
      }
      // 2.3 右孩子存在则入栈
      if (curNode.right) {
        stack.push(curNode.right)
      }
    }
    // 3.打印结果并返回
    console.log(result)
    return true
  }
  /** 广度优先遍历
   * @param {TNode} node 
   */
  breTravesal (node) {
    if (!node) {
      return false
    }
    // 1.初始化:当前节点入队
    let queue = []
    queue.push(node)
    // 2.循环:队不空时
    while (queue.length) {
      // 2.1当前节点出队访问
      let curNode = queue.shift()
      curNode.exec()
      // 2.2 左孩子存在则入队
      if (curNode.left) {
        queue.push(curNode.left)
      }
      // 2.2 右孩子存在则入队
      if (curNode.right) {
        queue.push(curNode.right)
      }
    }
  }

  /* 二叉搜索树树问题 */
  /** 二叉搜索树插入节点
   * @param {TNode} node 
   * @param {*} value 
   */
  insert (node, value) {
    if (value < node.value) {
      if (node.left) {
        this.insert(node.left, value)
      }
      else {
        this.size++
        node.left = new TNode(value)
      }
    }
    if (value > node.value) {
      if (node.right) {
        this.insert(node.right, value)
      }
      else {
        this.size++
        node.right = new TNode(value)
      }
    }
  }
  /** 找到二叉搜索树第k小节点
   * @param {TNode} node
   * @param {Number} k 
   */
  getKthMin (node, k) {
    let result = []
    // 中序遍历并保存
    tree.saveMidOrder(node, result)
    console.log(result[k - 1]);
  }

  /* 二叉树深度问题 */
  /** 得到节点最大深度
   * 后序遍历取更深的子树深度
   * @param {TNode} node 起始节点
   * @param {Number} deep 起始节点深度 
   */
  getDeepMax (node) {
    if (!node) {
      return 0
    }
    let left = getDeepMax(node.left)
    let right = getDeepMax(node.right)
    return Math.max(left, right) + 1
  }
  /** 二叉树的最小深度
   * BFS变种：每次处理一层
   * @param {TNode} root 根节点
   */
  getDeepMin (root) {
    if (!root) {
      return 0
    }
    const queue = [root]
    let depth = 1
    while (queue.length) {
      const length = queue.length
      for (let i = 0; i < length; i++) {
        const cur = queue.shift()
        if (cur.left == null && cur.right == null) {
          return depth
        }
        if (cur.left) {
          queue.push(cur.left)
        }
        if (cur.right) {
          queue.push(cur.right)
        }
      }
      depth++ // 肯定有下一层，如果没有早就return了
    }
  }
  /** 判断平衡二叉树(后序遍历应用)
   * 后序遍历：判断是否子树不平衡，平衡时返回深度
   * http://www.conardli.top/docs/dataStructure/%E4%BA%8C%E5%8F%89%E6%A0%91/%E5%B9%B3%E8%A1%A1%E4%BA%8C%E5%8F%89%E6%A0%91.html
   * @param {TNode} pRoot 
   */
  isBalanced (pRoot) {
    return isBalancedCore(pRoot) != -1
  }
  isBalancedCore (node) {
    if (!node) {
      return 0
    }
    let left = isBalancedCore(node.left)
    let right = isBalancedCore(node.right)
    if (left == -1 || right == -1 || Math.abs(left - right) > 1) {
      return -1
    }
    return Math.max(left, right) + 1
  }
}

/* 二叉树遍历问题 */
/** 已知前中遍历，重建二叉树
 * @param {String} pre "1,2,4,7,3,5,6,8"
 * @param {String} mid "4,7,2,1,5,3,8,6"
 */
function reConstructBinaryTree (pre, mid) {
  // 鲁棒性
  if (!pre) {
    return null
  }
  // 递归停止条件：
  // 先序遍历队列剩最后一个
  if (pre.length === 1) {
    return new TNode(pre[0])
  }
  let curValue = pre[0]
  let curIdx = mid.indexOf(curValue)
  let leftMid = pre.slice(0, curIdx)
  let rightMid = pre.slice(curIdx + 1)
  let leftPre = pre.slice(1, curIdx + 1)
  let rightPre = pre.slice(curIdx + 1)
  let node = new TNode(curValue)
  node.left = reConstructBinaryTree(leftPre, leftMid)
  node.right = reConstructBinaryTree(rightPre, rightMid)
  return node
}
/** 二叉树遍历问题：
 * 已知前中遍历，求后序遍
 * @param {String} pre 
 * @param {String} mid 
 */
function getHRD (pre, mid) {
  if (!pre) {
    return ""
  }
  if (pre.length === 1) {
    return pre[0]
  }
  let curNode = pre[0]
  let curIdx = mid.indexOf(curNode)
  let leftMid = mid.slice(0, curIdx)
  let rightMid = mid.slice(curIdx + 1)
  let leftPre = pre.slide(1, leftMid.length)
  let rightPre = pre.slice(leftMid.length)
  return getHRD(leftPre, leftMid) + getHRD(rightPre, rightMid) + curNode
}
/** 二叉树遍历问题：
 * 根据后序遍历判断是否是二叉搜索树
 * @param {Array} arr 
 */
function verifySquenceOfBST (arr) {
  // 递归停止：
  if (!arr) {
    return true
  }
  let length = arr.length
  let mid = arr[length - 1]
  let i = 0
  while (arr[i] < mid) {
    i++
  }
  let j = i
  while (j < length) {
    if (arr[j] < mid) {
      return false
    }
    j++
  }
  let left = true
  if (i > 0) {
    left = verifySquenceOfBST(arr.slice(0, i))
  }
  let right = true
  if (i < length - 1) {
    right = verifySquenceOfBST(arr.slice(i, length - 1))
  }
  return left && right
}
/** 二叉树遍历问题
 * 二叉树序列化
 * https://leetcode-cn.com/problems/xu-lie-hua-er-cha-shu-lcof/solution/ceng-xu-bian-li-si-lu-jiang-jie-javascriptshi-xian/
 * @param {TNode} root 
 */
function serialize (root) {
  if (!root) {
    return "[]"
  }
  let queue = [root]
  let result = ''
  while (queue.length) {
    let node = queue.shift()
    if (node) {
      result += `${node.value},`
      queue.push(node.left)
      queue.push(node.right)
    } else {
      result += '#,'
    }
    console.log(result);
  }
  return '[' + result.slice(0, -1) + ']'
}
/** 二叉树遍历问题
 * 二叉树反序列化
 * @param {string} str
 * @return {TreeNode}
 */
function deserialize (str) {
  if (str <= 2) {
    return null
  }
  let serialQue = str.slice(1, -1).split(',') // 序列化结果
  let root = new TNode(+serialQue.shift()) // 构建树的根
  let queue = [root] // 将要构建的节点
  while (queue.length) {
    let node = queue.shift()
    let leftVal = serialQue.shift()
    if (leftVal !== '#') {
      node.left = new TNode(+leftVal)
      queue.push(node.left)
    }
    let rightVal = serialQue.shift()
    if (rightVal !== '#') {
      node.right = new TNode(+rightVal)
      queue.push(node.right)
    }
  }
  return root
}
/** 二叉树遍历问题：
 * 找出当前节点 在中序遍历中的下一个节点
 * 问题分解：
 * 1.右节点不为空 - 取右节点的最左侧节点
 * 2.右节点为空 - 如果节点是父亲节的左节点 取父节点
 * 3.右节点为空 - 如果节点是父亲节的右节点 找到是左孩子的祖先节点 取其祖先
 * 4.都不满足返回null
 * @param {TNode} pNode  
 */
function getNext (pNode) {
  if (!pNode) {
    return null
  }
  // 1.
  if (pNode.right) {
    pNode = pNode.right
    while (pNode.left) {
      pNode = pNode.left
    }
    return pNode
  }
  else {
    // 2.
    if (pNode.parent.left === pNode) {
      return pNode.parent
    }
    // 3.
    else {
      while (pNode.parent) {
        if (pNode === pNode.parent.left) {
          return pNode.parent
        }
        pNode = pNode.parent
      }
    }
  }
  // 4.
  return null
}
/** 二叉树遍历问题
 * 比较两棵树是否相等
 * @param {TNode} node1 
 * @param {TNode} node2 
 */
function compare (node1, node2) {
  if (node2 === null) {
    return true
  }
  if (node1 === null) {
    return false
  }
  if (node1.value !== node2.value) {
    return false
  }
  return compare(node1.left, node2.left) && compare(node1.right, node2.right)
}
/** 二叉树遍历问题：
 * 树的子结构
 * @param {TNode} pRoot1 树根
 * @param {TNode} pRoot2 判断的子结构根
 */
function hasSubtree (pRoot1, pRoot2) {
  let result = false
  if (pRoot1 && pRoot2) {
    if (pRoot1.value === pRoot2.value) {
      result = compare(pRoot1, pRoot2)
    }
    if (!result) {
      result = hasSubtree(pRoo1.left, pRoot2)
    }
    if (!result) {
      result = hasSubtree(pRoo1.right, pRoot2)
    }
  }
  return result
}


/* 二叉树深度问题 */
/** 二叉搜索树转换双向链表
 * 原文地址：https://xxoo521.com/2020-02-06-btree-link/
 * @param {Node} root
 * @return {Node}
 */
function treeToDoublyList (root) {
  if (!root) {
    return
  }
  let head = null
  let pre = head
  treeToDoublyListCore(root)
  // 完成中序遍历后，pre指向了最后一个节点
  // 将其闭合成环状结构
  head.left = pre
  pre.right = head
  return head
}
/** 
 * @param {Node} node
 */
function treeToDoublyListCore (node) {
  if (!node) {
    return
  }
  // 遍历左子树
  treeToDoublyListCore(node.left, pre)

  // 处理当前节点
  if (!pre) {
    // 遍历到最左边节点，此时节点就是双向链表的head
    head = node
  } else {
    pre.right = node
  }
  node.left = pre
  pre = node

  // 遍历右子树
  treeToDoublyListCore(node.right, pre)
}

/** 对称性问题：
 * 判断二叉树是否对称
 * @param {TNode} node1 
 * @param {TNode} node2 
 */
function isSymmetrical (pRoot) {
  if (!pRoot) {
    return false
  }
  return isSymmetricalCore(pRoot, pRoot);
}
function isSymmetricalCore (node1, node2) {
  if (!node1 && !node2) {
    return true
  }
  if (!node1 || !node2) {
    return false
  }
  if (node1.value !== node2.value) {
    return false
  }
  return isSymmetricalCore(node1.left, node2.right) && isSymmetricalCore(node1.right, node2.left)
}
/** 对称性问题：
 * 二叉树镜像
 * @param {TNode} root 
 */
function mirror (root) {
  if (!root) {
    return null
  }
  let rightVal = root.right.value
  root.right.value = root.left.value
  root.left.value = rightVal
  mirror(root.left)
  mirror(root.right)
}

/* 回溯问题 */
/** 二叉树中和为某一值的路径
 * 
 * @param {TNode} root 
 * @param {Number} expectNumber 
 */
function findPath (root, expectNumber) {
  const result = []
  if (root) {
    findPathCore(root, expectNumber, [], 0, result)
  }
  return result
}
/** 
 * 找到路径核心递归函数
 * @param {TNode} node 
 * @param {Number} expectNumber 
 * @param {Array} stack 
 * @param {Number} sum 
 * @param {Array} result 
 */
function findPathCore (node, expectNumber, stack, sum, result) {
  stack.push(node.value)
  sum += node.value
  if (!node.left && !node.right && sum === expectNumber) {
    // arr.slice(0)实现数组浅拷贝
    result.push(stack.slice(0))
  }
  if (node.left) {
    findPathCore(node.left, expectNumber, stack, sum, result)
  }
  if (node.right) {
    findPathCore(node.right, expectNumber, stack, sum, result)
  }
  stack.pop()
}

let tree = new BiTree(new TNode(3))
tree.insert(tree.root, 1)
tree.insert(tree.root, 2)
tree.insert(tree.root, 4)
tree.insert(tree.root, 5)
// tree.preOrder(tree.root)
// tree.midOrder(tree.root)
// tree.backOrder(tree.root)
// tree.preOrderNR(tree.root)
// tree.midOrderNR(tree.root)
// tree.backOrder(tree.root)
// tree.breTravesal(tree.root)
// console.log(tree.getDeep(tree.root, 0))
tree.midOrder(deserialize(serialize(tree.root)))
