import { Loading } from '@/components/loading';
import { defaultSetting } from '@/default-setting';
import { usePCScreen } from '@/hooks/use-pc-screen';
import { useSelector } from '@/hooks/use-selector';
import Watermark from '@/layouts/common/watermark';
import { useGlobalStore } from '@/stores/global';
import { useSettingStore } from '@/stores/setting';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import TabsLayout from '../../common/tabs-layout';


function Content() {

  const isPC = usePCScreen();

  const { collapsed } = useGlobalStore(useSelector('collapsed'));
  const { showKeepAliveTab } = useSettingStore(useSelector('showKeepAliveTab'));

  const marginLeft = isPC ? collapsed ? defaultSetting.collapsedSlideWidth : defaultSetting.slideWidth : defaultSetting.mobileMargin;

  return (
    <div
      className='transition-all mt-header bg-[var(--ant-color-bg-container)]  rounded-lg'
      style={{
        marginLeft,
        minHeight: `calc(100vh - ${defaultSetting.headerHeight}px)`,
        width: `calc(100vw - ${(isPC ? collapsed ? defaultSetting.collapsedSlideWidth : defaultSetting.slideWidth : defaultSetting.mobileMargin * 2)}px)`
      }}
    >
        <div
          className='m-0 rounded-md z-1 p-[0px]'
        >
          <Suspense
            fallback={(
              <Loading />
            )}
          >
            {showKeepAliveTab ? <TabsLayout /> : <Watermark type='content'><Outlet /></Watermark> }
          </Suspense>
        </div>

    </div>
  );
}

export default Content;
