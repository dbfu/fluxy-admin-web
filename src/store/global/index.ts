import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware';

interface State {
  darkMode: boolean;
  collapsed: boolean;
  lang: string;
}

interface Action {
  setDarkMode: (darkMode: State['darkMode']) => void;
  setCollapsed: (collapsed: State['collapsed']) => void;
  setLang: (lang: State['lang']) => void;
}

export const useGlobalStore = create<State & Action>()(
  devtools(persist(
    (set) => {
      return {
        darkMode: false,
        collapsed: false,
        lang: 'zh',
        setDarkMode: (darkMode: State['darkMode']) => set({
          darkMode,
        }),
        setCollapsed: (collapsed: State['collapsed']) => set({
          collapsed,
        }),
        setLang: (lang: State['lang']) => set({
          lang,
        }),
      };
    },
    {
      name: 'globalStore',
      storage: createJSONStorage(() => localStorage),
    }
  ),
    { name: 'globalStore' }
  )
)
