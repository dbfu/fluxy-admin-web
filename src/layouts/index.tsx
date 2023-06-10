import { Outlet, useNavigate } from "react-router-dom"
import { useGlobalStore } from '@/stores/global';
import { useEffect } from 'react';
import { App } from 'antd';
import GloablLoading from '@/components/global-loading';

import Slide from './slide';
import Header from './header';
import Content from './content';
import userService from '@/service';
import { antdUtils } from '@/utils/antd';
import { useRequest } from '@/hooks/use-request';
import { useUserStore } from '@/stores/global/user';

const BasicLayout: React.FC = () => {

  const { refreshToken } = useGlobalStore();
  const { setCurrentUser } = useUserStore();
  const navigate = useNavigate();

  const {
    loading,
    data: currentUserDetail,
    run: getCurrentUserDetail,
  } = useRequest(
    userService.getCurrentUserDetail,
    { manual: true }
  );

  useEffect(() => {
    if (!refreshToken) {
      navigate('/user/login');
      return;
    }
    getCurrentUserDetail();
  }, [refreshToken, getCurrentUserDetail, navigate]);

  useEffect(() => {
    setCurrentUser(currentUserDetail || null);
  }, [currentUserDetail, setCurrentUser]);

  useEffect(() => {
    function storageChange(e: StorageEvent) {
      if (e.key === useGlobalStore.persist.getOptions().name) {
        useGlobalStore.persist.rehydrate();
      }
    }

    window.addEventListener<'storage'>('storage', storageChange);

    return () => {
      window.removeEventListener<'storage'>('storage', storageChange);
    }
  }, []);

  const { notification, message, modal } = App.useApp();

  useEffect(() => {
    antdUtils.setMessageInstance(message);
    antdUtils.setNotificationInstance(notification);
    antdUtils.setModalInstance(modal);
  }, [notification, message, modal]);

  if (loading) {
    return (
      <GloablLoading />
    )
  }

  return (
    <div className='bg-primary overflow-hidden'>
      <Header />
      <Slide />
      <Content>
        <Outlet />
      </Content>
    </div>
  );
};

export default BasicLayout;