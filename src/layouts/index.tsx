import { Outlet, useNavigate } from "react-router-dom"
import { useGlobalStore } from '@/stores/global';

import Slide from './slide';
import Header from './header';
import Content from './content';
import { useEffect } from 'react';

const BasicLayout: React.FC = () => {

  const { token } = useGlobalStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/user/login');
    }
  }, [navigate, token]);

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