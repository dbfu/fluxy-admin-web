import { useGlobalStore } from '@/models/global';

import { Outlet } from "react-router-dom"
import { Suspense } from 'react';

import Slide from './slide';
import { Loading } from '@/components/loading';
import Header from './header';
import { usePCScreen } from '@/hooks/use-pc-screen';

const BasicLayout: React.FC = () => {

  const isPC = usePCScreen();

  const {
    collapsed,
  } = useGlobalStore();

  return (
    <div className='bg-primary overflow-hidden before:(content-[""])'>
      <Header />
      <Slide />
      <div
        className='mt-[80px] w-[100%] bg-container !<lg:ml-[16px]'
        style={{
          borderRadius: '8px',
          marginLeft: collapsed ? 112 : 280,
          minHeight: 'calc(100vh - 80px)',
          transition: "all 200ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
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