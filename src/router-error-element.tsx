import { useRouteError } from 'react-router-dom';

const RouterErrorElement = () => {
  const error = useRouteError();
  throw error;
}

export default RouterErrorElement;