import { Rnd } from "react-rnd";
import { useUIStore } from "../../store/useUIStore";
import styles from "./Window.module.css";

type Props = {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
};

export function Window({
  id,
  title,
  children,
  defaultWidth = 660,
  defaultHeight = 460,
}: Props) {
  const { windows, bringToFront } = useUIStore();
  const win = windows[id];

  if (!win?.isOpen) return null;

  return (
    <Rnd
      default={{ x: 100, y: 80, width: defaultWidth, height: defaultHeight }}
      minWidth={400}
      minHeight={280}
      bounds="window"
      dragHandleClassName={styles.header}
      style={{ zIndex: win.zIndex }}
      onMouseDown={() => bringToFront(id)}
    >
      <div className={styles.window}>
        <div className={styles.header}>
          <div className={styles.controls}>
            <span className={`${styles.dot} ${styles.close}`} />
            <span className={`${styles.dot} ${styles.minimize}`} />
            <span className={`${styles.dot} ${styles.maximize}`} />
          </div>
          <span className={styles.title}>{title}</span>
          <span className={styles.spacer} />
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </Rnd>
  );
}
