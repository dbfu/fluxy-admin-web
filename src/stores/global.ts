import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

interface State {
  darkMode: boolean;
  collapsed: boolean;
  lang: string;
  token: string;
  refreshToken: string;
}

interface Action {
  setDarkMode: (darkMode: State['darkMode']) => void;
  setCollapsed: (collapsed: State['collapsed']) => void;
  setLang: (lang: State['lang']) => void;
  setToken: (lang: State['token']) => void;
  setRefreshToken: (lang: State['refreshToken']) => void;
}

export const useGlobalStore = create<State & Action>()(
  devtools(persist(
    (set) => {
      return {
        darkMode: false,
        collapsed: false,
        lang: 'zh',
        token: '',
        refreshToken: '',
        setDarkMode: (darkMode: State['darkMode']) => set({
          darkMode,
        }),
        setCollapsed: (collapsed: State['collapsed']) => set({
          collapsed,
        }),
        setLang: (lang: State['lang']) => set({
          lang,
        }),
        setToken: (token: State['token']) => set({
          token,
        }),
        setRefreshToken: (refreshToken: State['refreshToken']) => set({
          refreshToken,
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
