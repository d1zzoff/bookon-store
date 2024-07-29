import { create } from "zustand";

interface Props {
  sort: string | undefined | null;
  setSort: (v: string | null) => void;
}

export const useSort = create<Props>((set) => ({
  sort: null,
  setSort: (v: string | null) =>
    set(() => ({
      sort: v,
    })),
}));
