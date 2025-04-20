import { useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import styles from './TreeView.module.scss';
import { useTreeStore } from './store';
import { TreeRow } from './components';

const TreeView = () => {
  const nodes = useTreeStore((state) => state.visibleNodes);
  const getTree = useTreeStore((state) => state.getNodes);
  const setVisibleNodes = useTreeStore((state) => state.setVisibleNodes);

  useEffect(() => {
    try {
      getTree();
    } catch (error) {
      console.error('Error fetching tree data:', error);
    }
  }, []);

  return (
    <div className={styles.TreeViewContainer}>
      <AutoSizer>
        {({ width, height }) => (
          <List
            itemCount={nodes.length}
            itemSize={40}
            width={width}
            height={height}
          >
            {({ index, style }) => (
              <TreeRow
                node={nodes[index]}
                style={style}
                setVisibleNodes={setVisibleNodes}
              />
            )}
          </List>
        )}
      </AutoSizer>
    </div>
  );
};

export default TreeView;
