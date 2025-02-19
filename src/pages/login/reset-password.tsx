import { auth_getPublicKey, auth_resetPassword } from '@/api/auth';
import { antdUtils } from '@/utils/antd';
import { t } from '@/utils/i18n';
import { getParamsBySearchParams } from '@/utils/utils';
import { LockOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Form, Input } from 'antd';
import { JSEncrypt } from "jsencrypt";
import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import RightContent from './components/right-content';
import './index.css';

const ResetPassword = () => {

  const navigate = useNavigate();

  const {
    runAsync: getPublicKey
  } = useRequest(auth_getPublicKey, { manual: true });
  const {
    runAsync: resetPassword,
    loading
  } = useRequest(auth_resetPassword, { manual: true });

  const [query] = useSearchParams();

  useEffect(() => {
    const params = getParamsBySearchParams(query) as any;

    if (!params.email || !params.emailCaptcha) {
      antdUtils.message?.error('重置链接不正确，请检查。')
    }

  }, [query]);

  const onFinish = async (values: any) => {

    if (values.confirmPassword !== values.password) {
      antdUtils.message?.error('两次密码不一致');
      return;
    }
    // 获取公钥
    const publicKey = await getPublicKey();
    // 使用公钥对密码加密
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    const password = encrypt.encrypt(values.password);

    if (!password) {
      return;
    }

    const params = getParamsBySearchParams(query) as unknown as any;

    values.password = password;
    values.publicKey = publicKey;
    values.email = params.email;
    values.emailCaptcha = params.emailCaptcha;

    await resetPassword(values);

    antdUtils.message?.success('密码重置成功');

    navigate('/user/login');
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className='flex-[2.5] flex justify-center'>
        <div className='dark:bg-[rgb(33,41,70)] w-[400px] px-[32px] py-[20px] mt-[-12%] bg-white rounded-lg <lg:(w-[94%] mx-auto)'>
          <div className='mb-[32px]'>
            <div className='flex gap-2'>
              <h2 className='text-primary' style={{ marginBottom: '0.6em' }}>重置密码</h2>
            </div>
            <div className='text-[16px]' >设置你的新密码</div>
          </div>
          <Form
            name="super-admin"
            className="login-form"
            onFinish={onFinish}
            size="large"
          >
            <Form.Item
              name="password"
              rules={[{ required: true, message: t("DjMcEMAe" /* 请输入密码 */) }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder={t("HplkKxdY" /* 密码 */)}
                size="large"
                type="password"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={[{ required: true, message: t("DjMcEMAe" /* 请输入密码 */) }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="重复密码"
              />
            </Form.Item>
            <Form.Item style={{ marginBottom: 18 }}>
              <Button
                type="primary"
                loading={loading}
                block
                htmlType='submit'
              >
                确认
              </Button>
            </Form.Item>
            <Form.Item noStyle style={{ marginBottom: 0 }} >
              <div
                className='text-right mb-[18px]'
              >
                <Link to="/user/login" className='text-[16px] text-primary select-none' type='link'>返回登录</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
      <RightContent />
    </div>
  );
};

export default ResetPassword;
