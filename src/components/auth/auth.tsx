import { isAuth } from '@/utils/auth';
import React, { FC } from 'react';

const Auth: FC<{ authCode: string, children: React.ReactElement }> = ({
  authCode,
  children,
}) => {

  if (isAuth(authCode)) {
    return children;
  }

  return null;
}

export default Auth;