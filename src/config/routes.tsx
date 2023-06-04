import { DashboardOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

export interface MenuItem {
   path: string;
   title?: string;
   icon?: any;
   element?: any;
   children?: MenuItem[];
   layout?: boolean;
   Component?: any;
}



export const routeConfig: MenuItem[] = [
   {
      path: '/dashboard',
      title: 'Dashboard',
      icon: <DashboardOutlined />,
      Component: lazy(() => import('../pages/dashboard')),
   },
   {
      path: '/system',
      title: '系统管理',
      icon: <SettingOutlined />,
      children: [{
         path: '/system/user',
         Component: lazy(() => import('../pages/user')),
         title: '用户管理',
         icon: <UserOutlined />,
      }]
   },
   {
      path: '/',
      element: <Navigate to='/dashboard' />,
   }
]
