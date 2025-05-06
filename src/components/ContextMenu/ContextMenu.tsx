import { ReactNode, useEffect } from 'react';
import styles from './ContextMenu.module.scss';
import { useContextMenu } from './store';

const ContextMenuContainer = () => {};

const ContextMenu = ({ children }: { children?: ReactNode }) => {
  const position = useContextMenu((state) => state.position);
  const setMenu = useContextMenu((state) => state.setMenu);

  useEffect(() => {
    const handleClick = () => {
      setMenu(null);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [setMenu]);

  useEffect(() => {
    const treeViewListEle = document.querySelector('.TreeViewList');
    if (position) {
      if (treeViewListEle) {
        treeViewListEle.className = 'TreeViewList no-scroll';
      }
    } else {
      if (treeViewListEle) {
        treeViewListEle.className = 'TreeViewList';
      }
    }
  }, [position]);

  return (
    <>
      {children}
      {position && (
        <>
          <div
            style={{ top: position.y + 10, left: position.x }}
            className={styles.ContextMenu}
          >
            <div className={styles.ContextMenuItem}>
              <span>Open</span>
            </div>
            <div className={styles.ContextMenuItem}>
              <span>Rename</span>
            </div>
            <div className={styles.ContextMenuItem}>
              <span>Delete</span>
            </div>
            <div className={styles.ContextMenuItem}>
              <span>Properties</span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ContextMenu;
