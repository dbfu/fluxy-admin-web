import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const Result404 = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={(
      <Button type="primary">
        <Link to="/">Back Home</Link>
      </Button>
    )}
  />
);

export default Result404;