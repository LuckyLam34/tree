import { useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import styles from './TreeView.module.scss';
import { useTreeStore } from './store';
import { TreeRow } from './components';
import { ContextMenu, useContextMenu } from '../../components/ContextMenu';
import classNames from 'classnames';

const TreeView = () => {
  const nodes = useTreeStore((state) => state.visibleNodes);
  const getTree = useTreeStore((state) => state.getNodes);
  const setVisibleNodes = useTreeStore((state) => state.setVisibleNodes);
  const setMenu = useContextMenu((state) => state.setMenu);
  const isContextMenuOpen = useContextMenu((state) => state.position);

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
            className="TreeViewList"
            itemCount={nodes.length}
            itemSize={36}
            width={width}
            height={height}
          >
            {({ index, style }) => (
              <TreeRow
                node={nodes[index]}
                style={style}
                setVisibleNodes={setVisibleNodes}
                setMenu={setMenu}
              />
            )}
          </List>
        )}
      </AutoSizer>
    </div>
  );
};

export default TreeView;
