import { RouteObject, RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';

import Login from './pages/login';
import BasicLayout from './layouts';
import { App } from 'antd';
import { useEffect } from 'react';
import { antdUtils } from './utils/antd';
import ResetPassword from './pages/login/reset-password';
import Result404 from '@/404';

export const router = createBrowserRouter(
  [
    {
      path: '/user/login',
      Component: Login,
    },
    {
      path: '/user/reset-password',
      Component: ResetPassword,
    },
    {
      path: '*',
      Component: BasicLayout,
      children: [{
        path: '*',
        Component: Result404,
      }, {
        path: '/',
        element: (
          <Navigate to="/dashboard" />
        ),
      }]
    },
  ]
);

function findNodeByPath(routes: RouteObject[], path: string) {
  for (let i = 0; i < routes.length; i += 1) {
    const element = routes[i];

    if (element.path === path) return element;

    findNodeByPath(element.children || [], path);
  }
}

export const addRoutes = (parentPath: string, routes: RouteObject[]) => {
  if (!parentPath) {
    router.routes.push(...routes as any);
    return;
  }

  const curNode = findNodeByPath(router.routes, parentPath);

  if (curNode?.children) {
    curNode?.children.push(...routes);
  } else if (curNode) {
    curNode.children = routes;
  }
}


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

