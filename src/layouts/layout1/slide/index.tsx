import { useUpdateEffect } from 'ahooks';
import { Drawer } from 'antd';

import { IconBuguang } from '@/assets/icons/buguang';
import { defaultSetting } from '@/default-setting';
import { usePCScreen } from '@/hooks/use-pc-screen';
import { useGlobalStore } from '@/stores/global';
import SlideMenu from './menu';


function SlideIndex() {

  const isPC = usePCScreen();

  const {
    collapsed,
    setCollapsed,
  } = useGlobalStore();


  useUpdateEffect(() => {
    if (!isPC) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [isPC]);


  function renderMenu() {
    return (
      <SlideMenu />
    )
  }

  if (!isPC) {
    return (
      <Drawer
        open={!collapsed}
        footer={null}
        placement="left"
        width={defaultSetting.slideWidth}
        zIndex={10001}
        closable={false}
        title={(
          <div
            className='flex items-center gap-[4px] text-[20px] justify-center'
            style={{ width: defaultSetting.slideWidth }}
          >
            <IconBuguang className="text-primary" />
            <h1 className='font-bold text-[22px]'>{defaultSetting.title}</h1>
          </div>
        )}
        styles={{
          header: { padding: '24px 0', border: 'none' },
          body: { padding: '0 16px' }
        }}
        onClose={() => {
          setCollapsed(true);
        }}
      >
        {renderMenu()}
      </Drawer>
    )
  }

  return (
    <div
      style={{ width: collapsed ? defaultSetting.collapsedSlideWidth : defaultSetting.slideWidth }}
      className="menu-slide bg-transparent transition-all top-header fixed box-border left-0 bottom-0 overflow-y-auto px-[16px] max-md:hidden"
    >
      {renderMenu()}
    </div>
  )
}

export default SlideIndex;