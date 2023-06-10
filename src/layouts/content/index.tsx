import { Loading } from '@/components/loading';
import { defaultSetting } from '@/default-setting';
import { usePCScreen } from '@/hooks/use-pc-screen';
import { useGlobalStore } from '@/stores/global';
import { FC, Suspense } from 'react';

const Content: FC<any> = ({ children }) => {

  const isPC = usePCScreen();

  const {
    collapsed,
  } = useGlobalStore();

  return (
    <div
      className='color-transition mt-[80px] w-[100%] bg-container !<lg:ml-[16px]'
      style={{
        borderRadius: '8px',
        marginLeft: collapsed ? 112 : defaultSetting.slideWidth,
        minHeight: 'calc(100vh - 80px)',
        transition: "all 200ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
        width: `calc(100vw - ${isPC ? collapsed ? 112 : defaultSetting.slideWidth : 32}px)`
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
          {children}
        </Suspense>
      </div>
    </div>
  )
}

export default Content;