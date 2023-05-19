import { t } from '@/utils/i18n';
import { IconBuguang } from '@/assets/icons/buguang'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [loading] = useState(false);

  const navigate = useNavigate();

  const onFinish = async () => {
    navigate('/');
  };

  return (
    <div className="bg-primary light:bg-[rgb(238,242,246)] bg-[rgb(238,242,246)] flex justify-center items-center h-[100vh]">
      <div className='dark:bg-[rgb(33,41,70)] w-[328px] px-[32px] py-[20px] mt-[-12%] bg-white rounded-md'>
        <div className='text-center'>
          <div className='flex justify-center gap-2'>
            <IconBuguang className='text-[20px] text-blue-500' />
            <h1 className='dark:(text-white) ' style={{ marginBottom: '0.2em' }}>fluxy-admin</h1>
          </div>
          <h3
            className='dark:(text-white) text-[rgba(0,0,0,.45)] mb-[1em] text-[14px] font-normal'
          >
            {t("wbTMzvDM" /* 一个高颜值后台管理系统 */)}
          </h3>
        </div>
        <Form
          name="super-admin"
          className="login-form"
          initialValues={{ username: 'admin', password: '123456789' }}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: t("wVzXBuYs" /* 请输入账号 */) }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder={t("RNISycbR" /* 账号 */)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: t("DjMcEMAe" /* 请输入密码 */) }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder={t("HplkKxdY" /* 密码 */)}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 18 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              {t("dDdqAAve" /* 登录 */)}
            </Button>
          </Form.Item>
        </Form>
      </div>

    </div>
  );
};

export default Login;
