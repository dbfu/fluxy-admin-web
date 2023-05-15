import { Outlet } from "react-router-dom"

import Slide from './slide';
import Header from './header';
import Content from './content';

const BasicLayout: React.FC = () => {
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