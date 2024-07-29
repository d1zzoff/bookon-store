import { create } from "zustand";

interface Props {
  languages: string[];
  toggleLanguage: (v: string) => void;
  setLanguages: (v: string[]) => void;
}

export const useLanguageFilter = create<Props>((set) => ({
  languages: [],
  toggleLanguage: (v: string) =>
    set((state) => {
      const exists = state.languages.includes(v);
      return {
        languages: exists
          ? state.languages.filter((language) => language !== v)
          : [...state.languages, v],
      };
    }),
  setLanguages: (v: string[]) => set({ languages: v }),
}));
