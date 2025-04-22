import { TreeNode } from './TreeNode';

describe('TreeNode', () => {
  const mockRawNode = (id: string, name: string, indexPath: number[]): any => ({
    nodeId: id,
    name,
    indexPath,
  });

  test('constructor initializes properties correctly', () => {
    const rawNode = mockRawNode('1', 'Node 1', []);
    const treeNode = new TreeNode(rawNode);

    expect(treeNode.id).toBe('1');
    expect(treeNode.name).toBe('Node 1');
    expect(treeNode.isExpanded).toBe(false);
    expect(treeNode.isSelected).toBe(false);
    expect(treeNode.children).toEqual([]);
    expect(treeNode.parents).toEqual([]);
  });

  test('toggleExpand toggles isExpanded', () => {
    const rawNode = mockRawNode('1', 'Node 1', []);
    const treeNode = new TreeNode(rawNode);

    expect(treeNode.isExpanded).toBe(false);
    treeNode.toggleExpand();
    expect(treeNode.isExpanded).toBe(true);
    treeNode.toggleExpand();
    expect(treeNode.isExpanded).toBe(false);
  });

  test('toggleSelect toggles isSelected', () => {
    const rawNode = mockRawNode('1', 'Node 1', []);
    const treeNode = new TreeNode(rawNode);

    expect(treeNode.isSelected).toBe(false);
    treeNode.toggleSelect();
    expect(treeNode.isSelected).toBe(true);
    treeNode.toggleSelect();
    expect(treeNode.isSelected).toBe(false);
  });

  test('isVisible returns true if all parents are expanded', () => {
    const rawNode = mockRawNode('1', 'Node 1', []);
    const parent1 = new TreeNode(mockRawNode('2', 'Parent 1', []));
    const parent2 = new TreeNode(mockRawNode('3', 'Parent 2', []));
    const treeNode = new TreeNode(rawNode, [parent1, parent2]);

    expect(treeNode.isVisible()).toBe(false);

    parent1.toggleExpand();
    parent2.toggleExpand();
    expect(treeNode.isVisible()).toBe(true);
  });

  test('parse creates a tree structure from raw data', () => {
    const rawData = [
      mockRawNode('1', 'Node 1', []),
      mockRawNode('2', 'Node 2', [0]),
      mockRawNode('3', 'Node 3', [0, 1]),
    ];

    const nodeCreator = (node: any, parents: TreeNode[]) =>
      new TreeNode(node, parents);
    const getIdxParents = (node: any) => node.indexPath;

    const tree = TreeNode.parse(rawData, nodeCreator, getIdxParents);

    expect(tree.length).toBe(3);
    expect(tree[0].id).toBe('1');
    expect(tree[1].id).toBe('2');
    expect(tree[1].parent?.id).toBe('1');
    expect(tree[2].id).toBe('3');
    expect(tree[2].parent?.id).toBe('2');
  });
});
