import 'nprogress/nprogress.css';
import ReactDOM from 'react-dom/client';
import App from './app.tsx';
import './check-update.ts';

import { registerAuthDirective } from './directives/auth.tsx';
import './index.css';

registerAuthDirective()


ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)
