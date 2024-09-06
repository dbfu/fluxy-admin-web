import Result404 from '@/components/exception/404';
import { pages } from '@/config/pages';
import globalService, { Menu, MenuType } from '@/global-service';
import { replaceRoutes, router } from '@/router/router-utils';
import { useGlobalStore } from '@/stores/global';
import { useUserStore } from '@/stores/user';
import { useRequest } from 'ahooks';
import { lazy, useEffect, useState } from 'react';


export function useUserDetail() {

  const [loading, setLoading] = useState(true);

  const { refreshToken } = useGlobalStore();
  const { setCurrentUser } = useUserStore();

  const { data: currentUserDetail, loading: requestLoading } = useRequest(
    globalService.getCurrentUserDetail,
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
        const children = menuGroup[menu.id];

        const parentPaths = parentMenu?.parentPaths || [];
        const lastPath = parentPaths[parentPaths.length - 1];
        const path = (parentMenu ? `${lastPath}${menu.route}` : menu.route) || '';

        routes.push({ ...menu, path, parentPaths });

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

    const menuGroup = menus.reduce<Record<string, Menu[]>>((prev, menu) => {
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

    currentUserDetail.flatMenus = routes;
    currentUserDetail.menus = formatMenus(menus.filter(o => !o.parentId), menuGroup, routes);

    currentUserDetail.authList = menus
      .filter(menu => menu.type === MenuType.BUTTON && menu.authCode)
      .map(menu => menu.authCode!);


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

    setCurrentUser(currentUserDetail);

    // replace一下当前路由，为了触发路由匹配
    router.navigate(`${location.pathname}${location.search}`, { replace: true });

    setLoading(false);
  }, [currentUserDetail, setCurrentUser]);

  return {
    loading: requestLoading || loading,
  }
}

