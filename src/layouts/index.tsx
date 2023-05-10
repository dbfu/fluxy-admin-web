import { Icon3 } from '@/assets/icons/3'
import { IconJiaretaiyang } from '@/assets/icons/jiaretaiyang'
import { IconShuyi_fanyi36 } from '@/assets/icons/shuyi_fanyi-36'
import { IconFangdajing } from '@/assets/icons/fangdajing'
import { MenuOutlined, BellOutlined, SettingOutlined } from '@ant-design/icons';
import { IconBuguang } from '@/assets/icons/buguang'
import { Layout, Menu, Input, Avatar } from 'antd';

import { useRoutes, useLocation, Link } from "react-router-dom"
import { useState } from 'react';

import { routeConfig } from '../config/routes';
import { useStore } from '@/models/global';

const { Header, Sider } = Layout;

const BasicLayout: React.FC = () => {
  const routes = useRoutes(routeConfig);
  const location = useLocation();

  const [collapsed, setCollapsed] = useState<boolean>(false);

  const slideWidth = 280;

  const { setDarkMode, darkMode } = useStore(state => ({
    setDarkMode: state.setDarkMode,
    darkMode: state.darkMode,
  }));

  return (
    <Layout className='bg-primary'>
      <Header
        style={{ zIndex: 1001 }}
        className="h-[80px] flex basis-[48px] items-center px-0 gap-[16px] fixed top-0 right-0 left-0 bg-primary"
      >
        <div style={{ width: slideWidth }} className=" flex justify-between items-center px-[24px] pr-0 <sm:hidden">
          <div className='flex items-center gap-[4px] text-[20px]'>
            <IconBuguang className="text-blue-500" />
            <h1 className='text-primary font-bold text-[18px]'>fluxy-admin</h1>
          </div>
          <div
            className='btn-icon'
            onClick={() => {
              setCollapsed(prev => !prev);
            }}
          >
            <MenuOutlined />
          </div>
        </div>
        <div className='flex items-center justify-between flex-1 pr-[24px]'>
          <Input
            style={{
              borderRadius: 8,
              outline: 'none',
              boxShadow: 'none'
            }}
            className='w-[400px] h-[50px] focus:(border-[rgb(135,94,196)]) <sm:hidden'
            size="large"
            prefix={
              <IconFangdajing
                style={{
                  color: '#697586',
                  paddingRight: 8,
                }}
              />
            }
            placeholder="搜索菜单"
            allowClear
          />
          <div className='pl-[20px] sm:hidden'>
            <div
              className='btn-icon'
              onClick={() => {
                setCollapsed(prev => !prev);
              }}
            >
              <MenuOutlined />
            </div>
          </div>
          <div className='flex gap-[16px] items-center'>
            <div onClick={() => { setDarkMode(!darkMode) }} className='btn-icon text-[20px]'>
              {darkMode ? (
                <IconJiaretaiyang />
              ) : (
                <Icon3 />
              )}
            </div>
            <div className='btn-icon text-[20px] bg-[rgb(227,242,253)] dark:text-[rgb(30,136,229)] text-[rgb(30,136,229)] hover:(bg-[rgb(33,150,243)] dark:text-[rgb(227,242,253)] text-[rgb(227,242,253)])'>
              <IconShuyi_fanyi36 />
            </div>
            <div className='btn-icon'>
              <BellOutlined />
            </div>
            <div className='btn-icon rounded-[27px] pl-[10px] pr-[14px] justify-between h-[48px] w-[92px] text-[20px] bg-[rgb(227,242,253)] text-[rgb(30,136,229)] hover:(bg-[rgb(33,150,243)] text-[rgb(227,242,253)])'>
              <Avatar style={{ backgroundColor: 'gold', verticalAlign: 'middle' }} icon={<IconBuguang />} />
              <SettingOutlined />
            </div>
          </div>
        </div>
      </Header>
      <Sider
        collapsed={collapsed}
        style={{ position: 'fixed' }}
        width={slideWidth}
        className="top-[80px] left-0 bottom-0 overflow-y-auto px-[16px] bg-primary <sm:hidden"
      >
        <Menu
          className='bg-primary'
          mode="inline"
          selectedKeys={[location.pathname]}
          style={{ height: '100%', borderRight: 0 }}
          items={routeConfig.map(item => ({
            key: item.path,
            label: (
              <Link to={item.path}>{item.title}</Link>
            ),
            icon: item.icon,
            children: item.children,
          }))}
          inlineCollapsed={collapsed}
        />
      </Sider>
      <div
        className='p-[16px] mx-[16px] mt-[80px] w-[100%] bg-container !<sm:ml-0'
        style={{
          borderRadius: '8px',
          marginLeft: collapsed ? 80 : 280,
          minHeight: 'calc(100vh - 80px)',
          transition: "margin 200ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
        }}
      >
        <div
          className='m-0 rounded-md z-1'
        >
          {routes}
        </div>
      </div>
    </Layout>
  );
};

export default BasicLayout;