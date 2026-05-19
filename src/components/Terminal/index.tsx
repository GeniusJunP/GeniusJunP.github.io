import { useRef, useCallback } from "react";
import { Terminal as WTerminal, useTerminal } from "@wterm/react";
import "@wterm/react/css";
import { execute } from "../../lib/commands";
import styles from "./Terminal.module.css";

const PROMPT = "you@somewhere:~ $ ";

export function Terminal() {
  const { ref, write } = useTerminal();
  const buffer = useRef("");

  const handleData = useCallback(
    (data: string) => {
      const code = data.charCodeAt(0);

      if (data === "\r") {
        write("\r\n");
        const result = execute(buffer.current);
        if (result.clear) {
          write("\x1b[2J\x1b[H");
        } else if (result.output) {
          write(result.output + "\r\n");
        }
        buffer.current = "";
        write(PROMPT);
      } else if (code === 0x7f) {
        if (buffer.current.length > 0) {
          buffer.current = buffer.current.slice(0, -1);
          write("\b \b");
        }
      } else if (code >= 0x20) {
        buffer.current += data;
        write(data);
      }
    },
    [write],
  );

  return (
    <WTerminal
      ref={ref}
      theme="monokai"
      autoResize={true}
      onReady={() => {
        write(PROMPT);
      }}
      onData={handleData}
      className={styles.terminal}
    />
  );
}
