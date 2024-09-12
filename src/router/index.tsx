import { createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(routes);


