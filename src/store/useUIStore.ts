import { create } from "zustand";

type WindowState = {
  isOpen: boolean;
  zIndex: number;
};

type UIState = {
  windows: Record<string, WindowState>;
  topZ: number;
  bringToFront: (id: string) => void;
  toggleWindow: (id: string) => void;
};

export const useUIStore = create<UIState>((set) => ({
  windows: {
    terminal: { isOpen: true, zIndex: 1 },
  },
  topZ: 1,
  bringToFront: (id) =>
    set((s) => ({
      topZ: s.topZ + 1,
      windows: {
        ...s.windows,
        [id]: { ...s.windows[id], zIndex: s.topZ + 1 },
      },
    })),
  toggleWindow: (id) =>
    set((s) => ({
      windows: {
        ...s.windows,
        [id]: { ...s.windows[id], isOpen: !s.windows[id].isOpen },
      },
    })),
}));
