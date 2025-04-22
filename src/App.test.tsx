import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./containers/TreeView', () => ({
  TreeView: () => <div>TreeView</div>,
}));

describe('App', () => {
  test('renders TreeView component', () => {
    render(<App />);
    const treeViewElement = screen.getByText(/TreeView/i);
    expect(treeViewElement).toBeInTheDocument();
  });
});
