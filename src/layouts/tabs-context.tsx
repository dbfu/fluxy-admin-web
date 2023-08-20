/* eslint-disable @typescript-eslint/no-empty-function */

import { createContext } from 'react'

interface KeepAliveTabContextType {
  refreshTab: (path?: string) => void;
  closeTab: (path?: string) => void;
  closeOtherTab: (path?: string) => void;
}

const defaultValue = {
  refreshTab: () => { },
  closeTab: () => { },
  closeOtherTab: () => { },
}


export const KeepAliveTabContext = createContext<KeepAliveTabContextType>(defaultValue);
