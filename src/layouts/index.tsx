import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { useGlobalStore } from '@/stores/global';
import { lazy, useEffect, useState } from 'react';
import GloablLoading from '@/components/global-loading';

import Slide from './slide';
import Header from './header';
import Content from './content';
import userService from '@/service';
import { useRequest } from '@/hooks/use-request';
import { useUserStore } from '@/stores/global/user';
import { Menu } from '@/pages/user/service';
import { components } from '@/config/routes';

import { addRoutes, router } from '@/router';

const BasicLayout: React.FC = () => {

  const [loading, setLoading] = useState(true);

  const { refreshToken, lang } = useGlobalStore();
  const { setCurrentUser, currentUser } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    data: currentUserDetail,
    run: getCurrentUserDetail,
  } = useRequest(
    userService.getCurrentUserDetail,
    { manual: true }
  );

  const formatMenus = (
    menus: Menu[],
    menuGroup: Record<string, Menu[]>,
    routes: Menu[],
    parentMenu?: Menu
  ): Menu[] => {
    return menus.map(menu => {
      const children = menuGroup[menu.id];

      const parentPaths = parentMenu?.parentPaths || [];
      const path = (parentMenu ? `${parentPaths.at(-1)}${menu.route}` : menu.route) || '';

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


  useEffect(() => {
    if (!refreshToken) {
      navigate('/user/login');
      return;
    }
    getCurrentUserDetail();
  }, [refreshToken, getCurrentUserDetail, navigate]);

  useEffect(() => {
    if (!currentUserDetail) return;

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

    currentUserDetail.menus = formatMenus(menus.filter(o => !o.parentId), menuGroup, routes);

    addRoutes('*', routes.map(menu => ({
      path: `/*${menu.path}`,
      Component: menu.filePath ? lazy(components[menu.filePath]) : null,
      id: `/*${menu.path}`,
      handle: {
        parentPaths: menu.parentPaths,
        path: menu.path,
      },
    })));

    setCurrentUser(currentUserDetail);
    setLoading(false);

    // replace一下当前路由，为了触发路由匹配
    router.navigate(`${location.pathname}${location.search}`, { replace: true });
  }, [currentUserDetail, setCurrentUser]);

  useEffect(() => {
    function storageChange(e: StorageEvent) {
      if (e.key === useGlobalStore.persist.getOptions().name) {
        useGlobalStore.persist.rehydrate();
      }
    }

    window.addEventListener<'storage'>('storage', storageChange);

    return () => {
      window.removeEventListener<'storage'>('storage', storageChange);
    }
  }, []);

  if (loading || !currentUser) {
    return (
      <GloablLoading />
    )
  }

  return (
    <div key={lang} className='bg-primary overflow-hidden'>
      <Header />
      <Slide />
      <Content>
        <Outlet />
      </Content>
    </div>
  );
};

export default BasicLayout;