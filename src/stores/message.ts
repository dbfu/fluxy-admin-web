import { SocketMessageType } from '@/layouts/layout/message-handle/interface';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface SocketMessage {
  type: SocketMessageType;
  data: any;
}

interface State {
  latestMessage?: SocketMessage | null;
}

interface Action {
  setLatestMessage: (latestMessage: State['latestMessage']) => void;
}

export const useMessageStore = create<State & Action>()(
  devtools(
    (set) => {
      return {
        latestMessage: null,
        setLatestMessage: (latestMessage: State['latestMessage']) =>
          set({
            latestMessage,
          }),
      };
    },
    {
      name: 'messageStore',
    }
  )
);
