import { create } from "zustand";

interface Props {
  categories: string[];
  toggleCategory: (v: string) => void;
  setCategories: (v: string[]) => void;
}

export const useCategoryFilter = create<Props>((set) => ({
  categories: [],
  toggleCategory: (v: string) =>
    set((state) => {
      const exists = state.categories.includes(v);
      return {
        categories: exists
          ? state.categories.filter((category) => category !== v)
          : [...state.categories, v],
      };
    }),
  setCategories: (v: string[]) => set({ categories: v }),
}));
