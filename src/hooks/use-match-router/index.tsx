import { useEffect, useState } from 'react';
import { useLocation, useMatches, useOutlet } from 'react-router-dom';

interface MatchRouteType {
  // 菜单名称
  title: string;
  // tab对应的url
  pathname: string;
  // 要渲染的组件
  children: any;
  // 路由，和pathname区别是，详情页 pathname是 /:id，routePath是 /1
  routePath: string;
  // 图标
  icon?: string;
}

export function useMatchRoute(): MatchRouteType | undefined {
  // 获取路由组件实例
  const children = useOutlet();
  // 获取所有路由
  const matches = useMatches();
  // 获取当前url
  const { pathname } = useLocation();

  const [matchRoute, setMatchRoute] = useState<MatchRouteType | undefined>();

  // 监听pathname变了，说明路由有变化，重新匹配，返回新路由信息
  useEffect(() => {

    // 获取当前匹配的路由
    const lastRoute = matches[matches.length - 1];

    if (!lastRoute?.handle) return;

    setMatchRoute({
      title: (lastRoute?.handle as any)?.name,
      pathname,
      children,
      routePath: lastRoute?.pathname || '',
      icon: (lastRoute?.handle as any)?.icon,
    });

  }, [pathname])


  return matchRoute;
}
