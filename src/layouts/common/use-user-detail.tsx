import { auth_getCurrentUser } from '@/api/auth';
import Result404 from '@/components/exception/404';
import { pages } from '@/config/pages';
import { useWebSocketMessage } from '@/hooks/use-websocket';
import { CurrentUser, Menu } from '@/interface';
import { MenuType } from '@/pages/menu/interface';
import { router } from '@/router';
import { replaceRoutes } from '@/router/router-utils';
import { useGlobalStore } from '@/stores/global';
import { SocketMessage, useMessageStore } from '@/stores/message';
import { useUserStore } from '@/stores/user';
import { useRequest, useUpdateEffect } from 'ahooks';
import { lazy, useEffect, useState } from 'react';

export function useUserDetail() {
  const [loading, setLoading] = useState(true);

  const { refreshToken, token } = useGlobalStore();
  const { setCurrentUser } = useUserStore();
  const { setLatestMessage } = useMessageStore();

  // 当获取完用户信息后，手动连接
  const { latestMessage, connect } = useWebSocketMessage(
    `${window.location.protocol.replace('http', 'ws')}//${window.location.host}/ws/?token=${token}`,
    { manual: true }
  );

  const { data: currentUserDetail, loading: requestLoading } = useRequest(
    auth_getCurrentUser,
    { refreshDeps: [refreshToken] }
  );

  useEffect(() => {
    if (!currentUserDetail) return;

    setLoading(true);

    function formatMenus(
      menus: Menu[],
      menuGroup: Record<string, Menu[]>,
      routes: Menu[],
      parentMenu?: Menu
    ): Menu[] {
      return menus.map(menu => {
        const children = menuGroup[menu.id!];

        const parentPaths = parentMenu?.parentPaths || [];
        const lastPath = parentPaths[parentPaths.length - 1];
        const path = (parentMenu ? `${lastPath}${menu.route}` : menu.route) || '';

        routes.push({
          ...menu,
          path,
          parentPaths,
        });

        return {
          ...menu,
          path,
          parentPaths,
          children: children?.length ? formatMenus(children, menuGroup, routes, {
            ...menu,
            parentPaths: [...parentPaths, path || ''].filter(o => o),
          }) : undefined,
        };
      });
    }

    const { menus = [] } = currentUserDetail;

    const menuGroup = menus.reduce<Record<string, API.MenuVO[]>>((prev, menu) => {
      if (!menu.parentId) {
        return prev;
      }

      if (!prev[menu.parentId]) {
        prev[menu.parentId] = [];
      }

      prev[menu.parentId].push(menu);
      return prev;
    }, {});

    const routes: Menu[] = [];

    const currentUser: CurrentUser = {
      ...currentUserDetail,
      flatMenus: routes,
      menus: formatMenus(menus.filter(o => !o.parentId), menuGroup, routes),
      authList: menus
        .filter(menu => menu.type === MenuType.BUTTON && menu.authCode)
        .map(menu => menu.authCode!),
    };


    replaceRoutes('*', [
      ...routes.map(menu => {
        return ({
          path: `/*${menu.path}`,
          id: `/*${menu.path}`,
          Component: menu.filePath ? pages[menu.filePath] ? lazy(pages[menu.filePath]) : Result404 : Result404,
          handle: {
            parentPaths: menu.parentPaths,
            path: menu.path,
            name: menu.name,
            icon: menu.icon,
          },
        })
      }), {
        id: '*',
        path: '*',
        Component: Result404,
        handle: {
          path: '404',
          name: '404',
        },
      }
    ]);

    setCurrentUser(currentUser);

    // replace一下当前路由，为了触发路由匹配
    router.navigate(`${location.pathname}${location.search}`, { replace: true });

    setLoading(false);

    connect && connect();
  }, [currentUserDetail, setCurrentUser]);


  useUpdateEffect(() => {
    if (latestMessage?.data) {
      try {
        const socketMessage = JSON.parse(latestMessage?.data) as SocketMessage;
        setLatestMessage(socketMessage)
      } catch {
        console.error(latestMessage?.data);
      }
    }
  }, [latestMessage]);

  useUpdateEffect(() => {
    if (token) {
      connect && connect();
    }
  }, [token])

  return {
    loading: requestLoading || loading,
  }
}

