// 获取树的深度
export function getTreeDepth(node: any) {
  if (!node) {
    return 0; // 如果节点为空，深度为0
  }

  let maxChildDepth = 0; // 当前节点的子节点的最大深度

  // 遍历当前节点的所有子节点，递归调用 getTreeDepth 函数获取子节点的深度
  for (const child of node.children || []) {
    const childDepth = getTreeDepth(child);
    if (childDepth > maxChildDepth) {
      maxChildDepth = childDepth;
    }
  }

  return maxChildDepth + 1; // 当前节点的深度为子节点的最大深度加1
}
