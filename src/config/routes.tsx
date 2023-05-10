import { UserOutlined, ProjectOutlined } from '@ant-design/icons';
import Home from '../pages/home';
import User from '../pages/user';



export const routeConfig = [
   {
      path: '/home',
      element: <Home />,
      title: '项目列表',
      icon: <ProjectOutlined />,
      children: [{
         path: '/home',
         element: <Home />,
         title: '项目列表',
         icon: <ProjectOutlined />,
      }],
   },
   {
      path: '/user',
      element: <User />,
      title: 'user',
      icon: <UserOutlined />,
   },
]
