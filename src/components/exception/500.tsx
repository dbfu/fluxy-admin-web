import { Button, Result } from 'antd';
import React from 'react';

const ErrorPage: React.FC = () => (
  <Result
    status="error"
    title="出错了"
    subTitle="我们正在努力修复中，请稍后再试。"
    extra={[
      <Button
        type="primary"
      >
        <a href='/'>
          回到首页
        </a>
      </Button>
    ]}
  />
);

export default ErrorPage;