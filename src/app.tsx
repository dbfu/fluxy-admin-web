import { useEffect, useMemo } from 'react';
import { ConfigProvider, ThemeConfig, theme, App as AntdApp } from 'antd'
import { RouterProvider, createHashRouter } from 'react-router-dom';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';

import { useGlobalStore } from './stores/global'
import { routeConfig } from './config/routes';

import Login from './pages/login';
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
          colorBgElevated: 'rgb(26, 34, 63)'
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
      locale={lang === 'zh' ? zhCN : enUS}
      componentSize='large'
    >
      <AntdApp>
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
