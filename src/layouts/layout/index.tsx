import GlobalLoading from '@/components/global-loading';
import { useSelector } from '@/hooks/use-selector';
import { useGlobalStore } from '@/stores/global';
import { antdUtils } from '@/utils/antd';
import { useEffect } from 'react';
import { useUserDetail } from '../common/use-user-detail';
import Watermark from '../common/watermark';
import Content from './content';
import Header from './header';
import MessageHandle from './message-handle';
import Slide from './slide';
import SystemSetting from './system-setting';

export default function Layout() {

  const { lang } = useGlobalStore(useSelector('lang'));
  const { loading, disconnectWS } = useUserDetail();

  useEffect(() => {
    if (import.meta.env.PROD) {
      // 加定时器是为了解决闪烁问题
      setTimeout(() => {
        antdUtils.notification.warning({
          description: '请注意，每天晚上 12 点数据会重置所有数据。',
          message: '提示',
          duration: 0,
          placement: 'topRight'
        });
      }, 300);
    }
  }, [])

  if (loading) {
    return (
      <GlobalLoading />
    )
  }

  return (
    <Watermark type='full'>
      <div key={lang} className='overflow-hidden'>
        <MessageHandle />
        <Header disconnectWS={disconnectWS} />
        <Slide />
        <Content />
        {import.meta.env.DEV && <SystemSetting />}
      </div>
    </Watermark>
  );
}
