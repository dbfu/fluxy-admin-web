import { Icon3 } from '@/assets/icons/3'
import { IconJiaretaiyang } from '@/assets/icons/jiaretaiyang'
import { IconShuyi_fanyi36 } from '@/assets/icons/shuyi_fanyi-36'
import { IconFangdajing } from '@/assets/icons/fangdajing'
import { MenuOutlined, BellOutlined, SettingOutlined } from '@ant-design/icons';
import { IconBuguang } from '@/assets/icons/buguang'
import { usePCScreen } from '@/hooks/use-pc-screen';
import { useGlobalStore } from '@/models/global';

import { Input, Avatar } from 'antd';

import { Outlet } from "react-router-dom"
import { Suspense, useEffect } from 'react';

import Slide from './slide';
import { Loading } from '@/component/loading';
import Header from './header';

const BasicLayout: React.FC = () => {

  const isPC = usePCScreen();


  const slideWidth = 280;

  const {
    darkMode,
    collapsed,
    setCollapsed,
    setDarkMode,
  } = useGlobalStore(
    ({
      darkMode,
      collapsed,
      setDarkMode,
      setCollapsed,
    }) => ({
      darkMode,
      collapsed,
      setDarkMode,
      setCollapsed,
    })
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
  }, [darkMode])

  return (
    <div className='bg-primary overflow-hidden'>
      <Header />
      <Slide />
      <div
        className='mt-[80px] w-[100%] bg-container !<lg:ml-[16px]'
        style={{
          borderRadius: '8px',
          marginLeft: collapsed ? 112 : 280,
          minHeight: 'calc(100vh - 80px)',
          transition: "margin 200ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
          width: `calc(100vw - ${isPC ? collapsed ? 112 : 280 : 32}px)`
        }}
      >
        <div
          className='m-0 rounded-md z-1 p-[16px]'
        >
          <Suspense
            fallback={(
              <Loading />
            )}
          >
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default BasicLayout;