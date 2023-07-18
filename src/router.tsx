import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';

import Login from './pages/login';
import BasicLayout from './layouts';
import { App } from 'antd';
import { useEffect } from 'react';
import { antdUtils } from './utils/antd';
import ResetPassword from './pages/login/reset-password';

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
      children: []
    },
  ]
);

export const toLoginPage = () => {
  router.navigate('/user/login');
}

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

export const replaceRoutes = (parentPath: string, routes: RouteObject[]) => {
  if (!parentPath) {
    router.routes.push(...routes as any);
    return;
  }

  const curNode = findNodeByPath(router.routes, parentPath);

  if (curNode) {
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

