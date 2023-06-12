import { create } from 'zustand'
import { devtools } from 'zustand/middleware';

interface User {
  id: number;
  userName: string;
  nickName: string;
  phoneNumber: string;
  email: string;
  createDate: string;
  updateDate: string;
  avatarPath?: string;
}
interface State {
  currentUser: User | null;
}

interface Action {
  setCurrentUser: (currentUser: State['currentUser']) => void;
}

export const useUserStore = create<State & Action>()(
  devtools(
    (set) => {
      return {
        currentUser: null,
        setCurrentUser: (currentUser: State['currentUser']) => set({ currentUser }),
      };
    },
    { name: 'globalUserStore' }
  )
)
