import loginService from '@/pages/login/service';
import { toLoginPage } from '@/router/router-utils';
import { useGlobalStore } from '@/stores/global';
import { useMessageStore } from '@/stores/message';
import { antdUtils } from '@/utils/antd';
import to from 'await-to-js';
import { useEffect } from 'react';
import { SocketMessageType } from './interface';

const MessageHandle = () => {

   const { latestMessage } = useMessageStore();
   const { refreshToken, setToken } = useGlobalStore();

   const a = 'hello';

   console.log(a.toStrng())

   const messageHandleMap = {
      [SocketMessageType.PermissionChange]: () => {
         antdUtils.modal?.warning({
            title: '权限变更',
            content: '由于你的权限已经变更，需要重新刷新页面。',
            onOk: () => {
               window.location.reload();
            },
         })
      },
      [SocketMessageType.PasswordChange]: () => {
         const hiddenModal = antdUtils.modal?.warning({
            title: '密码重置',
            content: '密码已经重置，需要重新登录。',
            onOk: () => {
               toLoginPage();
               if (hiddenModal) {
                  hiddenModal.destroy();
               }
            },
         })
      },
      [SocketMessageType.TokenExpire]: async () => {
         // token失效调用刷新token，外面token变化，会自动重连。
         const [error, data] = await to(
            loginService.refreshToken(refreshToken)
         );
         if (!error) {
            setToken(data.token)
         } else {
            toLoginPage();
         }
      },
   };

   useEffect(() => {
      if (latestMessage?.type && messageHandleMap[latestMessage?.type]) {
         messageHandleMap[latestMessage?.type]();
      }
   }, [latestMessage])

   return null;
}

export default MessageHandle;