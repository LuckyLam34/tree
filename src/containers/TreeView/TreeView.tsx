import React, { useEffect } from 'react';
import styles from './TreeView.module.scss';
import { Arrow } from '../../components/Icons';
import { Button } from 'react-bootstrap';
import { useTreeStore } from './store';
import classNames from 'classnames';

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
    <div className={styles.TreeView}>
      <div>
        {nodes.map((node) => (
          <div
            key={node.id}
            style={{ '--level': node.parents.length } as React.CSSProperties}
            className={styles.TreeItem}
          >
            <Button
              className={classNames(node.isExpanded && styles.expanded)}
              onClick={() => {
                node.toggleExpand();
                setVisibleNodes();
              }}
              variant="link"
            >
              <Arrow width="10" height="6" />
            </Button>{' '}
            <span>{node.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TreeView;
