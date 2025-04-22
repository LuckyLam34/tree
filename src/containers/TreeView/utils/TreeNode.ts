import { RawNode } from '../types';

export class TreeNode {
  id: string;
  name: string;
  children: TreeNode[];
  isExpanded: boolean;
  isSelected: boolean;
  data: RawNode;
  parents: TreeNode[];

  constructor(data: RawNode, parents: TreeNode[] = []) {
    this.id = data.nodeId;
    this.name = data.name;
    this.isExpanded = false;
    this.isSelected = false;
    this.data = data;
    this.parents = parents;
    this.children = [];
  }

  get parent() {
    return this.parents[this.parents.length - 1];
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  toggleSelect() {
    this.isSelected = !this.isSelected;
  }

  isVisible() {
    const parentsExpanded = !this.parents.find((parent) => !parent.isExpanded);

    return parentsExpanded;
  }

  static parse(
    rawData: RawNode[],
    nodeCreator: (node: RawNode, parents: TreeNode[]) => TreeNode,
    getIdxParents: (node: RawNode) => number[],
  ) {
    const list: TreeNode[] = [];

    rawData.forEach((node) => {
      const parents = getIdxParents(node)
        .map((idx) => list[idx])
        .filter(Boolean);

      const treeNode = nodeCreator(node, parents);
      treeNode.parent?.children.push(treeNode);
      list.push(treeNode);
    });

    return list;
  }
}
