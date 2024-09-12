import { Button, Result, Typography } from 'antd';
import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const error = useRouteError() as Error;


  return (
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
        </Button>,
      ]}
    >
      {import.meta.env.DEV && error?.stack?.split('\n').map((item, index) => (
        <Typography.Paragraph>
          <Typography.Text
            type='danger'
            key={index}
          >
            {item}
          </Typography.Text>
        </Typography.Paragraph>
      ))}
    </Result>
  )
};

export default ErrorPage;