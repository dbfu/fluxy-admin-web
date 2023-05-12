import { create } from 'zustand'

interface State {
  darkMode: boolean;
  collapsed: boolean;
  setDarkMode: (darkMode: boolean) => void;
  setCollapsed: (collapsed: boolean) => void;
}

export const useGlobalStore = create<State>((set) => {
  return {
    darkMode: false,
    collapsed: false,
    setDarkMode: (darkMode: State['darkMode']) => set({
      darkMode,
    }),
    setCollapsed: (collapsed: State['collapsed']) => set({
      collapsed,
    })
  };
})
