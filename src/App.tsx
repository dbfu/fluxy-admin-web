import { useEffect, useMemo } from 'react';
import { ConfigProvider, ThemeConfig, theme } from 'antd'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { useGlobalStore } from './models/global'
import { routeConfig } from './config/routes';

import './overwrite.css'
import Login from './pages/user/login';
import BasicLayout from './layouts';
import Result404 from './404';
import { i18n } from './utils/i18n';

function App() {

  const { darkMode, lang } = useGlobalStore();

  const router = createBrowserRouter(
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
  }, []);

  const curTheme: ThemeConfig = useMemo(() => {

    if (darkMode) {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
      return {
        token: {
          colorPrimary: 'rgb(103, 58, 183)',
          // colorBgTextHover: '#f0e9f7',
          colorBgBase: 'rgb(17, 25, 54)',
          // colorBgLayout: 'rgb(17, 25, 54)',
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
          // colorBgTextHover: '#f0e9f7',
          // colorBgBase: 'rgb(17, 25, 54)',
          // colorBgLayout: 'rgb(17, 25, 54)',
          // colorBgContainer: 'rgb(26, 34, 63)',
          // colorBorder: 'rgba(189, 200, 240, 0.157)',
          // colorText: '#fff',
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
