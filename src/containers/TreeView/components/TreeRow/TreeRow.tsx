import { Button } from 'react-bootstrap';
import { TreeNode } from '../../utils';
import { Arrow } from '../../../../components/Icons';
import styles from './TreeRow.module.scss';
import classNames from 'classnames';

export const TreeRow = ({
  node,
  style,
  setVisibleNodes,
}: {
  style: React.CSSProperties;
  node: TreeNode;
  setVisibleNodes: () => void;
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
        className={styles.TreeRow}
      >
        <Button
          className={classNames(
            node.isDisplayed && styles.displayed,
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
