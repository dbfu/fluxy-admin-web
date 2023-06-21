import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routeConfig } from './config/routes';

import Login from './pages/login';
import BasicLayout from './layouts';
import Result404 from './404';
import { useGlobalStore } from './stores/global';
import { App } from 'antd';
import { useEffect } from 'react';
import { antdUtils } from './utils/antd';
import ForgotPassword from './pages/login/forgot-password';

export const router = createBrowserRouter(
  [
    {
      path: '/user/login',
      Component: Login,
    },
    {
      path: '/user/forgot-password',
      Component: ForgotPassword,
    },
    {
      path: '/',
      Component: BasicLayout,
      children: routeConfig,
    },
    {
      path: '*',
      Component: Result404,
    }
  ]
);

router.subscribe((state) => {
  const { refreshToken } = useGlobalStore.getState();

  if (!refreshToken && !(state.historyAction && (state.location.pathname === "/user/login" || state.location.pathname === "/user/forgot-password"))) {
    router.navigate('/user/login');
  }
});

const Router = () => {
  const { notification, message, modal } = App.useApp();

  useEffect(() => {
    antdUtils.setMessageInstance(message);
    antdUtils.setNotificationInstance(notification);
    antdUtils.setModalInstance(modal);
  }, [notification, message, modal]);

  return (
    <RouterProvider router={router} />
  )
};

export default Router;




