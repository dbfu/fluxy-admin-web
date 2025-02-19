import { auth_refreshToken } from '@/api/auth';
import { toLoginPage } from '@/router/router-utils';
import { useGlobalStore } from '@/stores/global';
import { useMessageStore } from '@/stores/message';
import { antdUtils } from '@/utils/antd';
import { useRequest } from 'ahooks';
import { Modal } from 'antd';
import { useEffect } from 'react';
import { SocketMessageType } from './interface';

const MessageHandle = () => {

   const { latestMessage } = useMessageStore();
   const { refreshToken, setToken } = useGlobalStore();

   const { run: refreshTokenFunc } = useRequest(auth_refreshToken, {
      manual: true,
      onSuccess: (data) => {
         setToken(data.token!)
      },
      onError() {
         toLoginPage();
      },
   });

   const messageHandleMap = {
      [SocketMessageType.PermissionChange]: () => {
         Modal.destroyAll();
         antdUtils.modal?.warning({
            title: '权限变更',
            content: '由于你的权限已经变更，需要重新刷新页面。',
            onOk: () => {
               window.location.reload();
            },
         })
      },
      [SocketMessageType.PasswordChange]: () => {
         Modal.destroyAll();
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
         refreshTokenFunc({ refreshToken });
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