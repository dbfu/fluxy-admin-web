import ReactDOM from 'react-dom/client'
import { App as AntdApp } from 'antd'
import NProgress from 'nprogress';

import App from './app'

import 'virtual:windi.css'
import 'nprogress/nprogress.css';

import './overwrite.css'

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
  parent: '#root'
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AntdApp>
    <App />
  </AntdApp>
)
