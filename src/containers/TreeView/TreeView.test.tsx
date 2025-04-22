import { render, screen } from '@testing-library/react';
import TreeView from './TreeView';
import { useTreeStore } from './store';
import { TreeNode } from './utils';
import { JSX } from 'react';

// Mock Zustand store
jest.mock('./store', () => ({
  useTreeStore: jest.fn(),
}));

// Mock TreeRow component
jest.mock('./components', () => ({
  TreeRow: ({ node }: { node: { name: string } }) => <div>{node.name}</div>,
}));

// Mock AutoSizer
jest.mock('react-virtualized-auto-sizer', () => {
  return ({
    children,
  }: {
    children: (size: { width: number; height: number }) => JSX.Element;
  }) => children({ width: 800, height: 600 }); // Provide mock dimensions
});

// Mock List
jest.mock('react-window', () => ({
  FixedSizeList: ({
    children,
    itemCount,
  }: {
    children: any;
    itemCount: number;
  }) => (
    <div>
      {Array.from({ length: itemCount }).map((_, index) =>
        children({ index, style: { height: 40, width: '100%' } }),
      )}
    </div>
  ),
}));

describe('TreeView', () => {
  beforeEach(() => {
    const mockData = {
      nodeId: '1',
      name: 'Node 1',
      type: 'root',
      path: '1',
      nodeType: 0,
      indexPath: [0],
    };

    // Mock Zustand store state
    (useTreeStore as any as jest.Mock).mockImplementation((selector) =>
      selector({
        visibleNodes: [new TreeNode(mockData, [])],
        getNodes: jest.fn(),
        setVisibleNodes: jest.fn(),
      }),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders TreeView with nodes', () => {
    render(<TreeView />);

    // Check that the mocked nodes are rendered
    expect(screen.getByText('Node 1')).toBeInTheDocument();
  });

  test('calls getTree on mount', () => {
    const mockGetNodes = jest.fn();
    (useTreeStore as any as jest.Mock).mockImplementation((selector) =>
      selector({
        visibleNodes: [],
        getNodes: mockGetNodes,
        setVisibleNodes: jest.fn(),
      }),
    );

    render(<TreeView />);

    // Ensure getTree (mocked as getNodes) is called
    expect(mockGetNodes).toHaveBeenCalledTimes(1);
  });
});
