import { RouterProvider } from 'react-router-dom';

import { antdUtils } from '@/utils/antd';
import { App } from 'antd';
import { useEffect } from 'react';
import { router } from './router-utils';


export default function RootRouterProvider() {
  const { notification, message, modal } = App.useApp();

  useEffect(() => {
    antdUtils.setMessageInstance(message);
    antdUtils.setNotificationInstance(notification);
    antdUtils.setModalInstance(modal);
  }, [notification, message, modal]);

  return (
    <RouterProvider router={router} />
  )
}


