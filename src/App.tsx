import { Window } from "./components/Window";
import { Terminal } from "./components/Terminal";
import { useUIStore } from "./store/useUIStore";
import styles from "./App.module.css";

export default function App() {
  const { windows } = useUIStore();

  return (
    <div className={styles.desktop}>
      {windows.terminal?.isOpen && (
        <Window id="terminal" title="Terminal">
          <Terminal />
        </Window>
      )}
    </div>
  );
}
