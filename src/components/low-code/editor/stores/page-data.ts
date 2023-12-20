import {create} from 'zustand';

interface State {
  data: any;
}

interface Action {
  /**
   * 设置变量值
   * @param component key
   * @param parentId 值
   * @returns
   */
  setData: (key: string, value: any) => void;
  /**
   * 重置数据
   * @returns
   */
  resetData: () => void;
  /**
   * 合并数据
   * @param data
   * @returns
   */
  mergeData: (data: any) => void;
}

export const usePageDataStore = create<State & Action>((set) => ({
  data: {},
  setData: (key, value) =>
    set((state) => ({data: {...state.data, [key]: value}})),
  mergeData: (data) => set((state) => ({data: {...state.data, ...data}})),
  resetData: () => set({data: {}}),
}));
