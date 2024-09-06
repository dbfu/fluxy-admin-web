import GlobalLoading from '@/components/global-loading';
import { useGlobalStore } from '@/stores/global';
import { Outlet } from 'react-router-dom';
import { useUserDetail } from '../common/use-user-detail';

export default function Layout2() {

  const { lang } = useGlobalStore();
  const { loading } = useUserDetail();


  if (loading) {
    return (
      <GlobalLoading />
    )
  }


  return (
    <div key={lang} className='overflow-hidden'>
      <Outlet />
    </div>
  );
}
