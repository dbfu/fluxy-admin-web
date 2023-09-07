import { useLocation, useNavigate } from "react-router-dom"
import { useGlobalStore } from '@/stores/global';
import { lazy, useEffect, useState } from 'react';
import GloablLoading from '@/components/global-loading';
import * as Sentry from '@sentry/react';
import Slide from './slide';
import Header from './header';
import userService from '@/service';
import { useRequest } from '@/hooks/use-request';
import { useUserStore } from '@/stores/global/user';
import { Menu } from '@/pages/user/service';
import { components } from '@/config/routes';

import { replaceRoutes, router } from '@/router';
import Result404 from '@/404';
import { SocketMessage, useMessageStore } from '@/stores/global/message';
import MessageHandle from './message-handle';
import { useWebSocketMessage } from '@/hooks/use-websocket';

import './index.css'
import { MenuType } from '@/pages/menu/interface';
import TabsLayout from './tabs-layout';
import Content from './content';

const BasicLayout: React.FC = () => {

  const [loading, setLoading] = useState(true);

  const { refreshToken, lang, token } = useGlobalStore();
  const { setCurrentUser, currentUser } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { setLatestMessage } = useMessageStore();



  // 当获取完用户信息后，手动连接
  const { latestMessage, connect } = useWebSocketMessage(
    `${window.location.protocol.replace('http', 'ws')}//${window.location.host}/ws/?token=${token}`,
    { manual: true }
  );

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
    if (latestMessage?.data) {
      try {
        const socketMessage = JSON.parse(latestMessage?.data) as SocketMessage;
        setLatestMessage(socketMessage)
      } catch {
        console.error(latestMessage?.data);
      }
    }
  }, [latestMessage]);


  useEffect(() => {
    if (!refreshToken) {
      navigate('/user/login');
      return;
    }
    getCurrentUserDetail();
  }, [refreshToken, getCurrentUserDetail, navigate]);

  useEffect(() => {
    if (currentUserDetail) {
      connect && connect();
    }
  }, [token]);

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

    currentUserDetail.authList = menus
      .filter(menu => menu.type === MenuType.BUTTON && menu.authCode)
      .map(menu => menu.authCode!);


    console.log(components, 'components');

    replaceRoutes('*', [
      ...routes.map(menu => ({
        path: `/*${menu.path}`,
        Component: menu.filePath ? lazy(components[menu.filePath]) : null,
        id: `/*${menu.path}`,
        handle: {
          parentPaths: menu.parentPaths,
          path: menu.path,
          name: menu.name,
          icon: menu.icon,
        },
      })), {
        id: '*',
        path: '*',
        Component: Result404,
        handle: {
          path: '404',
          name: '404',
        },
      }
    ]);

    Sentry.setUser({
      username: currentUserDetail.userName,
      id: currentUserDetail.id,
    });

    setCurrentUser(currentUserDetail);
    setLoading(false);

    // 连接websocket
    connect && connect();



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
    <div>
      <div key={lang} className='bg-primary overflow-hidden'>
        <MessageHandle />
        <Header />
        <Slide />
        <Content>
          <TabsLayout />
        </Content>
      </div>
    </div>
  );
};

export default BasicLayout;