import { create } from 'zustand';

type State = {
  position?: {
    x: number;
    y: number;
  };
  setMenu: (position: { x: number; y: number }) => void;
};

export const useContextMenu = create<State>((set, get) => ({
  position: undefined,
  setMenu: (position: { x: number; y: number }) => {
    set({ position });
  },
}));
