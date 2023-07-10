import { isAuth } from '@/utils/auth';
import { PureComponent, ReactNode } from 'react';

export function withAuth(authCode: string) {
  return class extends PureComponent<{ children: React.ReactElement }> {
    render(): ReactNode {
      if (isAuth(authCode)) {
        const { children } = this.props;
        return children;
      }
    }
  }
}