import GlobalLoading from '@/components/global-loading';
import { useSelector } from '@/hooks/use-selector';
import { useGlobalStore } from '@/stores/global';
import { useUserDetail } from '../common/use-user-detail';
import Content from './content';
import Header from './header';
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
    <div key={lang} className='overflow-hidden'>
      <Header />
      <Slide />
      <Content />
      {import.meta.env.DEV && <SystemSetting />}
    </div>
  );
}
