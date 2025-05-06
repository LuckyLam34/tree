import { Button } from 'react-bootstrap';
import { TreeNode } from '../../utils';
import { Arrow } from '../../../../components/Icons';
import styles from './TreeRow.module.scss';
import classNames from 'classnames';

export const TreeRow = ({
  node,
  style,
  setVisibleNodes,
  setMenu,
}: {
  style: React.CSSProperties;
  node: TreeNode;
  setVisibleNodes: () => void;
  setMenu: (position: { x: number; y: number }) => void;
}) => {
  return (
    <div style={style}>
      <div
        key={node.id}
        style={
          {
            '--level': node?.parents.length,
          } as React.CSSProperties
        }
        onContextMenu={(e) => {
          e.preventDefault();
          setMenu({ x: e.clientX, y: e.clientY });
        }}
        className={styles.TreeRow}
      >
        <Button
          className={classNames(
            styles.displayed,
            node.isExpanded && styles.expanded,
            node.children.length === 0 && styles.hide,
          )}
          onClick={() => {
            node.toggleExpand();
            setVisibleNodes();
          }}
          variant="link"
        >
          <Arrow width="10" height="6" />
        </Button>
        <span>{node.name}</span>
      </div>
    </div>
  );
};
