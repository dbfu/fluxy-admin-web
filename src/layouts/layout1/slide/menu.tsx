import { useGlobalStore } from '@/stores/global';
import { Menu } from 'antd';

import { antdIcons } from '@/assets/antd-icons';
import { Menu as MenuObj } from '@/global-service';
import { useUserStore } from '@/stores/user';
import { MenuItemType } from 'antd/es/menu/interface';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useMatches } from 'react-router-dom';
import './menu.css';

function SlideMenu() {

  const {
    collapsed,
    darkMode,
  } = useGlobalStore();

  const matches = useMatches();

  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectKeys, setSelectKeys] = useState<string[]>([]);


  const {
    currentUser,
  } = useUserStore();

  useEffect(() => {
    const [match] = matches || [];
    if (match) {
      // 获取当前匹配的路由，默认为最后一个
      const route = matches[matches.length - 1];
      // 从匹配的路由中取出自定义参数
      const handle = route?.handle as { parentPaths: [], path: string };
      // 从自定义参数中取出上级path，让菜单自动展开
      if (collapsed) {
        setOpenKeys([]);
      } else {
        setOpenKeys(handle?.parentPaths || []);
      }
      // 让当前菜单和所有上级菜单高亮显示
      setSelectKeys([...(handle?.parentPaths || []), handle?.path]);
    }
  }, [
    matches,
    collapsed,
  ]);

  const getMenuTitle = (menu: MenuObj) => {
    if (menu?.children?.filter(menu => menu.show)?.length) {
      return menu.name;
    }
    return (
      <Link to={menu.path}>{menu.name}</Link>
    );
  }

  const treeMenuData = useCallback((menus: MenuObj[]): MenuItemType[] => {
    return (menus)
      .map((menu: MenuObj) => {
        const children = menu?.children?.filter(menu => menu.show) || [];
        return {
          key: menu.path,
          label: getMenuTitle(menu),
          icon: menu.icon && antdIcons[menu.icon] && React.createElement(antdIcons[menu.icon]),
          children: children.length ? treeMenuData(children || []) : null,
        };
      })
  }, []);

  const menuData = useMemo(() => {
    return treeMenuData(currentUser?.menus?.filter(menu => menu.show) || []);
  }, [currentUser]);


  return (
    <Menu
      className='bg-transparent'
      mode="inline"
      selectedKeys={selectKeys}
      style={{ height: '100%', borderRight: 0 }}
      items={menuData}
      inlineCollapsed={collapsed}
      openKeys={openKeys}
      onOpenChange={setOpenKeys}
      theme={darkMode ? 'dark' : 'light'}
    />
  )
}

export default SlideMenu;
