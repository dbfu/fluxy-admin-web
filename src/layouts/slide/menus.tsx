import { useCallback, useEffect, useMemo, useState } from 'react';
import { Menu } from 'antd';
import type { ItemType } from 'antd/es/menu/hooks/useItems';
import { Link, useLocation, useMatches } from 'react-router-dom';

import { MenuItem, routeConfig } from '@/config/routes';
import { useGlobalStore } from '@/models/global';

const SlideMenu = () => {

  const location = useLocation();
  const matches = useMatches();

  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const {
    collapsed,
  } = useGlobalStore(
    ({ collapsed }) => ({
      collapsed,
    })
  );

  useEffect(() => {
    if (collapsed) {
      setOpenKeys([]);
    } else {
      setOpenKeys(matches.map(match => match.pathname));
    }
  }, [
    matches,
    collapsed,
  ]);


  const getMenuTitle = (menu: MenuItem) => {
    if (menu.children) {
      return menu.title;
    }
    return (
      <Link to={menu.path}>{menu.title}</Link>
    );
  }

  const treeMenuData = useCallback((menus: MenuItem[]): ItemType[] => {
    return (menus).map((menu: MenuItem) => {
      return {
        key: menu.path,
        label: getMenuTitle(menu),
        icon: menu.icon,
        children: menu.children ? treeMenuData(menu.children) : null
      };
    })
  }, [])


  const menuData = useMemo(() => {
    return treeMenuData(routeConfig || []);
  }, [treeMenuData]);

  return (
    <Menu
      className='bg-primary'
      mode="inline"
      selectedKeys={[location.pathname]}
      style={{ height: '100%', borderRight: 0 }}
      items={menuData}
      inlineCollapsed={collapsed}
      openKeys={openKeys}
      onOpenChange={setOpenKeys}
    />
  )
}

export default SlideMenu;
