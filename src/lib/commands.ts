export type CommandResult = {
  output: string;
  clear?: boolean;
};

const COMMANDS: Record<string, () => CommandResult> = {
  help: () => ({ output: "commands: about  research  music  clear  help" }),
  whoru: () => ({ output: "Hello, I'm じゅんぴー (JunP)." }),
  clear: () => ({ output: "", clear: true }),
};

export function execute(raw: string): CommandResult {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return { output: "" };
  return COMMANDS[cmd]?.() ?? { output: `command not found: ${cmd}` };
}
