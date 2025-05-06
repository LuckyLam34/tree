import { useEffect } from 'react';
import { TreeView } from './containers/TreeView';
import { ContextMenu } from './components/ContextMenu';

function App() {
  return (
    <>
      <ContextMenu>
        <TreeView />
      </ContextMenu>
    </>
  );
}

export default App;
