import ErrorPage from '@/components/exception/500';
import Layout from '@/layouts/layout';
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
    Component: Layout,
    children: [],
    errorElement: <ErrorPage />
  },
]