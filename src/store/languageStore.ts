import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { LanguageCode } from "@/types/learning";

interface LanguageState {
  selectedLanguage: LanguageCode | null;
  _hasHydrated: boolean;
  setSelectedLanguage: (code: LanguageCode) => void;
  clearSelectedLanguage: () => void;
  setHasHydrated: (value: boolean) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      selectedLanguage: null,
      _hasHydrated: false,
      setSelectedLanguage: (code) => set({ selectedLanguage: code }),
      clearSelectedLanguage: () => set({ selectedLanguage: null }),
      setHasHydrated: (value) => set({ _hasHydrated: value }),
    }),
    {
      name: "language-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("[languageStore] hydration failed:", error);
        } else {
          state?.setHasHydrated(true);
        }
      },
    }
  )
);
