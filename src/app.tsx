import { App as AntdApp, ConfigProvider, ThemeConfig } from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import { useEffect, useState } from 'react';

import { useGlobalStore } from '@/stores/global';

import RootRouterProvider from '@/router/provider';
import { configResponsive } from 'ahooks';
import NProgress from 'nprogress';
import { i18n } from './utils/i18n';

import { useSelector } from './hooks/use-selector';
import { useSettingStore } from './stores/setting';
import { generateDarkTheme } from './theme/dark';
import { generateLightTheme } from './theme/light';

configResponsive({
  md: 768,
  lg: 1024,
});

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
  parent: '#root'
});

function App() {

  const { darkMode, lang } = useGlobalStore(
    useSelector(['darkMode', 'lang'])
  );

  const { primaryColor } = useSettingStore(
    useSelector(['primaryColor'])
  )

  const [curTheme, setCurTheme] = useState<ThemeConfig>(() => {
    return darkMode ? generateDarkTheme('') : generateLightTheme('');
  });

  useEffect(() => {
    if (darkMode) {
      const theme = generateDarkTheme(primaryColor);
      document.body.classList.remove('light');
      document.body.classList.add('dark');
      document.body.style.backgroundColor = theme.token?.colorBgLayout || '';
      setCurTheme(theme);
    } else {
      const theme = generateLightTheme(primaryColor);
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      document.body.style.backgroundColor = theme.token?.colorBgLayout || '';
      setCurTheme(theme);
    }

    setTimeout(() => {
      document.body.style.transition = 'all 0.5s ease-in-out';
    }, 500);
    
  }, [darkMode, primaryColor]);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <ConfigProvider
      theme={curTheme}
      locale={lang === 'zh' ? zhCN : enUS}
      componentSize="middle"
    >
      <AntdApp>
        <RootRouterProvider />
      </AntdApp>
    </ConfigProvider >
  )
}

export default App
