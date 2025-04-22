import { render, screen, fireEvent } from '@testing-library/react';
import { TreeRow } from './TreeRow';
import { TreeNode } from '../../utils';
import { Arrow } from '../../../../components/Icons';

// Mock Arrow component
jest.mock('../../../../components/Icons', () => ({
  Arrow: ({ width, height }: { width: string; height: string }) => (
    <svg data-testid="arrow-icon" width={width} height={height} />
  ),
}));

describe('TreeRow', () => {
  const mockSetVisibleNodes = jest.fn();
  const mockData = {
    nodeId: '1',
    name: 'Node 1',
    type: 'root',
    path: '1',
    nodeType: 0,
    indexPath: [0],
  };
  const mockNode = new TreeNode(mockData, []);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders TreeRow with node name', () => {
    render(
      <TreeRow
        node={mockNode}
        style={{}}
        setVisibleNodes={mockSetVisibleNodes}
      />,
    );

    // Check if the node name is rendered
    expect(screen.getByText('Node 1')).toBeInTheDocument();

    // Check if the Arrow icon is rendered
    expect(screen.getByTestId('arrow-icon')).toBeInTheDocument();
  });

  test('applies correct styles based on node state', () => {
    mockNode.isExpanded = true;
    render(
      <TreeRow
        node={mockNode}
        style={{}}
        setVisibleNodes={mockSetVisibleNodes}
      />,
    );

    // Check if the expanded class is applied
    const button = screen.getByRole('button');
    expect(button).toHaveClass('expanded');
  });

  test('calls toggleExpand and setVisibleNodes on button click', () => {
    const toggleExpandSpy = jest.spyOn(mockNode, 'toggleExpand');

    render(
      <TreeRow
        node={mockNode}
        style={{}}
        setVisibleNodes={mockSetVisibleNodes}
      />,
    );

    // Simulate button click
    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Check if toggleExpand is called
    expect(toggleExpandSpy).toHaveBeenCalledTimes(1);

    // Check if setVisibleNodes is called
    expect(mockSetVisibleNodes).toHaveBeenCalledTimes(1);
  });
});
