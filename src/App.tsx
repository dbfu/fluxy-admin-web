import { useMemo } from 'react';
import { ConfigProvider, ThemeConfig, theme } from 'antd'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { useGlobalStore } from './models/global'
import { routeConfig } from './config/routes';

import './overwrite.css'
import Login from './pages/user/login';
import BasicLayout from './layouts';

function App() {

  const darkMode = useGlobalStore(state => state.darkMode);

  const router = createBrowserRouter(
    [
      {
        path: '/user/login',
        Component: Login,
      }, {
        path: '/',
        Component: BasicLayout,
        children: routeConfig,
      },
    ]
  );


  console.log(darkMode)

  const curTheme: ThemeConfig = useMemo(() => {

    if (darkMode) {
      return {
        token: {
          colorPrimary: 'rgb(103, 58, 183)',
          // colorBgTextHover: '#f0e9f7',
          // colorBgBase: 'rgb(17, 25, 54)',
          // colorBgLayout: 'rgb(17, 25, 54)',
          colorBgContainer: 'rgb(26, 34, 63)',
          colorBorder: 'rgba(189, 200, 240, 0.157)',
          colorBgTextHover: 'rgba(124, 77, 255, 0.082)',
          colorTextHover: 'rgba(124, 77, 255, 0.082)',
        },
        algorithm: theme.darkAlgorithm,
      }
    } else {
      return {
        token: {
          colorPrimary: 'rgb(103, 58, 183)',
          // colorBgTextHover: '#f0e9f7',
          // colorBgBase: 'rgb(17, 25, 54)',
          // colorBgLayout: 'rgb(17, 25, 54)',
          // colorBgContainer: 'rgb(26, 34, 63)',
          // colorBorder: 'rgba(189, 200, 240, 0.157)',
          // colorText: '#fff',
        },
      }
    }



  }, [darkMode])

  return (
    <ConfigProvider
      theme={curTheme}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
