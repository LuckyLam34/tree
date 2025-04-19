import { create } from 'zustand';
import { TreeNode } from '../utils';
import { treeApi } from '../services/treeApi';
import { RawNode } from '../types';

interface State {
  nodes: TreeNode[];
  visibleNodes: TreeNode[];
  getNodes: () => void;
  setVisibleNodes: () => void;
}

export const useTreeStore = create<State>((set, get) => ({
  nodes: [],
  visibleNodes: [],
  setVisibleNodes: () => {
    console.log(get().nodes);

    const visibleNodes = get().nodes.filter((node) => node.isExpanded);

    console.log(visibleNodes);

    set({ visibleNodes });
  },
  getNodes: async () => {
    const rawTree = await treeApi.getTree();
    const parsedTree = TreeNode.parse(
      rawTree,
      (rawNode: RawNode, parents: TreeNode[]) => new TreeNode(rawNode, parents),
      (rawNode: RawNode) => rawNode.indexPath,
    );

    set({
      nodes: parsedTree,
      visibleNodes: parsedTree.filter((node) => node.parents.length === 0),
    });
  },
}));
