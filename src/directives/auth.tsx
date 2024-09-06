import { isAuth } from '@/utils/auth';
import { directive } from "@dbfu/react-directive/directive";

export const registerAuthDirective = () => {
  directive('v-auth', {
    create: (authCode: string) => {
      return isAuth(authCode);
    },
  })
}