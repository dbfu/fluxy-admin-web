import GlobalLoading from '@/components/global-loading';
import { useSelector } from '@/hooks/use-selector';
import { useGlobalStore } from '@/stores/global';
import { useUserDetail } from '../common/use-user-detail';
import Watermark from '../common/watermark';
import Content from './content';
import Header from './header';
import MessageHandle from './message-handle';
import Slide from './slide';
import SystemSetting from './system-setting';

export default function Layout1() {

  const { lang } = useGlobalStore(useSelector('lang'));
  const { loading } = useUserDetail();

  if (loading) {
    return (
      <GlobalLoading />
    )
  }

  return (
    <Watermark type='full'>
      <div key={lang} className='overflow-hidden'>
        <MessageHandle />
        <Header />
        <Slide />
        <Content />
        {import.meta.env.DEV && <SystemSetting />}
      </div>
    </Watermark>
  );
}
