import { useUserStore } from '@/stores/user';
import { isAuth } from '@/utils/auth';
import { useMemo } from 'react';

export const useAuth = (authCode: string) => {
  const { currentUser } = useUserStore();
  const auth = useMemo(() => {
    return isAuth(authCode);
  }, [authCode, currentUser?.authList]);
  return auth;
}

