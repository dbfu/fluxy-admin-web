import { defaultSetting } from '@/default-setting';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface State {
  primaryColor: string;
  showKeepAliveTab: boolean;
  filterType: 'light' | 'query';
  showFormType: 'drawer' | 'modal';
}

interface Action {
  setPrimaryColor: (darkMode: State['primaryColor']) => void;
  setShowKeepAliveTab: (collapsed: State['showKeepAliveTab']) => void;
  setFilterType: (type: State['filterType']) => void;
  setShowFormType: (type: State['showFormType']) => void;
  reset: () => void;
}

export const useSettingStore = create<State & Action>()(
  devtools(persist(
    (set) => {
      return {
        primaryColor: defaultSetting.primaryColor,
        setPrimaryColor: (collapsed) => set({ primaryColor: collapsed }),
        showKeepAliveTab: defaultSetting.showKeepAliveTab,
        setShowKeepAliveTab: (collapsed) => set({ showKeepAliveTab: collapsed }),
        filterType: defaultSetting.filterType,
        setFilterType: (type) => set({ filterType: type }),
        showFormType: defaultSetting.showFormType,
        setShowFormType: (type) => set({ showFormType: type }),
        reset: () => {
          set({
            primaryColor: defaultSetting.primaryColor,
            showKeepAliveTab: defaultSetting.showKeepAliveTab,
            filterType: defaultSetting.filterType,
            showFormType: defaultSetting.showFormType,
          });
        }
      };
    },
    {
      name: 'settingStore',
      storage: createJSONStorage(() => localStorage),
    }
  ),
    { name: 'settingStore' }
  )
)
