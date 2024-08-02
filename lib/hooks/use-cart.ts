import { create } from "zustand";

interface Props {
  open: boolean;
  openCart: () => void;
  closeCart: () => void;
}

export const useCart = create<Props>((set) => ({
  open: false,
  openCart: () => set({ open: true }),
  closeCart: () => set({ open: false }),
}));
