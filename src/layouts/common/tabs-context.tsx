/* eslint-disable @typescript-eslint/no-empty-function */

import { createContext } from 'react';

interface KeepAliveTabContextType {
  /**
   * 刷新tab
   * @param path tab path 可以为空，为空则刷新当前tab
   */
  refreshTab: (path?: string) => void;
  /**
   * 关闭tab
   * @param path tab path 可以为空，为空则关闭当前tab
   */
  closeTab: (path?: string) => void;
  /**
   * 关闭其他tab
   * @param path tab path 可以为空，为空则关闭其他tab
   */
  closeOtherTab: (path?: string) => void;
}

const defaultValue = {
  refreshTab: () => { },
  closeTab: () => { },
  closeOtherTab: () => { },
}


export const KeepAliveTabContext = createContext<KeepAliveTabContextType>(defaultValue);
