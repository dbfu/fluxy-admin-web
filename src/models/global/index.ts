import { create } from 'zustand'

interface State {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}


export const useStore = create<State>((set) => {
  return {
    darkMode: false,
    setDarkMode: (mode: boolean) => set({
      darkMode: mode,
    })
  };
})
