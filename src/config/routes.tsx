import { DashboardOutlined, TableOutlined } from '@ant-design/icons';
import { lazy } from 'react';
import { Navigate } from 'react-router';

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
      path: '/table',
      Component: lazy(() => import('../pages/table')),
      title: '表格',
      icon: <TableOutlined />,
   },
   {
      path: '/',
      element: <Navigate to='/dashboard' />,
   }
]
