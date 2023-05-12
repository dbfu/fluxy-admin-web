import { UserOutlined, ProjectOutlined } from '@ant-design/icons';
import { lazy } from 'react';

export interface MenuItem {
   path: string;
   title?: string;
   icon?: any;
   element?: any;
   children?: MenuItem[];
   layout?: boolean;
   Component?: any;
}


export const routeConfig: MenuItem[] = [{
   path: '/home',
   title: '项目列表',
   icon: <ProjectOutlined />,
   children: [{
      path: '/home/index',
      Component: lazy(() => import('../pages/home')),
      title: '项目列表',
      icon: <ProjectOutlined />,
   }],
},
{
   path: '/user',
   Component: lazy(() => import('../pages/user')),
   title: 'user',
   icon: <UserOutlined />,
}]
