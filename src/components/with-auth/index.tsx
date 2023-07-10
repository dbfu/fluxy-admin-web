import { isAuth } from '@/utils/auth';

export function withAuth(authCode: string) {
  return function (Component: any) {
    return function (props: any) {
      return isAuth(authCode) ? <Component {...props}></Component> : null;
    }
  }
}
