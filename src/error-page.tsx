import React from 'react';
import { Button, Result } from 'antd';
import { router } from './router';

const ErrorPage: React.FC = () => (
  <Result
    status="error"
    title="出错了"
    subTitle="我们正在努力修复中，请稍后再试。"
    extra={[
      <Button onClick={() => { router.navigate('/') }} type="primary" key="console" >
        回到首页
      </Button>
    ]}
  />
);

export default ErrorPage;