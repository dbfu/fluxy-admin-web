import { IconBuguang } from '@/assets/icons/buguang'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onFinish = async () => {
    console.log('onFinish');
    navigate('/home/index');
  }; 1

  return (
    <div className="bg-[rgb(238,242,246)] flex justify-center items-center h-[100vh]">
      <div className='w-[328px] px-[32px] py-[20px] mt-[-12%] bg-white rounded-md'>
        <div className='text-center'>
          <div className='flex justify-center gap-2'>
            <IconBuguang className='text-[20px] text-blue-500' />
            <h1 style={{ marginBottom: '0.2em' }}>fluxy-admin</h1>
          </div>
          <h3
            style={{
              color: 'rgba(0,0,0,.45)',
              marginBottom: '1em',
              fontSize: '14px',
              fontWeight: 400,
            }}
          >
            一个高颜值后台管理系统
          </h3>
        </div>
        <Form
          name="super-admin"
          className="login-form"
          initialValues={{ username: 'admin', password: '123456' }}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入账号' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="账号"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 18 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
              block
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>

    </div>
  );
};

export default Login;
