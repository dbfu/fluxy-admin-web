import { useEffect, useMemo } from 'react';
import { ConfigProvider, ThemeConfig, theme } from 'antd'
import { RouterProvider, createHashRouter } from 'react-router-dom';

import { useGlobalStore } from './store/global'
import { routeConfig } from './config/routes';

import Login from './pages/user/login';
import BasicLayout from './layouts';
import Result404 from './404';
import { i18n } from './utils/i18n';

import './overwrite.css'

function App() {

  const { darkMode, lang } = useGlobalStore();

  const router = createHashRouter(
    [
      {
        path: '/user/login',
        Component: Login,
      }, {
        path: '/',
        Component: BasicLayout,
        children: routeConfig,
      }, {
        path: '*',
        Component: Result404,
      }
    ]
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
  }, [darkMode]);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  const curTheme: ThemeConfig = useMemo(() => {
    if (darkMode) {
      return {
        token: {
          colorPrimary: 'rgb(103, 58, 183)',
          colorBgBase: 'rgb(17, 25, 54)',
          colorBgContainer: 'rgb(26, 34, 63)',
          colorBorder: 'rgba(189, 200, 240, 0.157)',
          colorBgTextHover: 'rgba(124, 77, 255, 0.082)',
          colorTextHover: 'rgba(124, 77, 255, 0.082)',
          controlItemBgActive: 'rgba(33, 150, 243, 0.16)',
        },
        algorithm: theme.darkAlgorithm,
      }
    } else {
      return {
        token: {
          colorPrimary: 'rgb(103, 58, 183)',
        },
      }
    }
  }, [darkMode])

  return (
    <ConfigProvider
      theme={curTheme}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
