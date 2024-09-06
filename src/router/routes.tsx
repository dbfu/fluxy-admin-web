import ErrorPage from '@/components/exception/500';
import Layout1 from '@/layouts/layout1';
import Login from '@/pages/login';
import ResetPassword from '@/pages/login/reset-password';
import { Navigate, RouteObject } from 'react-router-dom';

export const routes: RouteObject[]  = [
  {
    path: '/user/login',
    Component: Login,
  },
  {
    path: '/user/reset-password',
    Component: ResetPassword,
  },
  {
    path: '/',
    element: (
      <Navigate to="/dashboard" />
    ),
  },
  {
    path: '*',
    Component: Layout1,
    children: [],
    errorElement: <ErrorPage />
  },
]