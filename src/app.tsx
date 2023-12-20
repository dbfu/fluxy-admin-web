import { App as AntdApp, ConfigProvider, ThemeConfig, theme } from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import { useEffect, useMemo } from 'react';

import { useGlobalStore } from './stores/global';

import * as Sentry from '@sentry/react';
import { registerAuthDirective } from './directives/auth';
import ErrorPage from './error-page';
import Router from './router';
import { i18n } from './utils/i18n';

registerAuthDirective();

function App() {

  const { darkMode, lang } = useGlobalStore();

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
          colorPrimary: 'rgb(124, 77, 255)',
          colorBgBase: 'rgb(17, 25, 54)',
          colorBgContainer: 'rgb(26, 34, 63)',
          colorBorder: 'rgba(189, 200, 240, 0.157)',
          colorBgTextHover: 'rgba(124, 77, 255, 0.082)',
          colorTextHover: 'rgba(124, 77, 255, 0.082)',
          controlItemBgActive: 'rgba(33, 150, 243, 0.16)',
          colorBgElevated: 'rgb(33, 41, 70)'
        },
        algorithm: theme.darkAlgorithm,
      }
    } else {
      return {
        token: {
          colorPrimary: 'rgb(124, 77, 255)',
        },
      }
    }
  }, [darkMode]);

  return (
    <ConfigProvider
      theme={curTheme}
      locale={lang === 'zh' ? zhCN : enUS}
      componentSize='large'
    >
      <AntdApp>
        <Sentry.ErrorBoundary fallback={() => <ErrorPage />}>
          <Router />
        </Sentry.ErrorBoundary>
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
