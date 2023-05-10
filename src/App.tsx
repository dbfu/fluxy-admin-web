import { ConfigProvider, ThemeConfig, theme } from 'antd'
import './App.css'
import Layout from './layouts'
import { useStore } from './models/global'
import { useMemo } from 'react';


function App() {

  const darkMode = useStore(state => state.darkMode);

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
      <div className={darkMode ? 'dark' : 'light'}>
        <Layout />
      </div>
    </ConfigProvider>
  )
}

export default App
