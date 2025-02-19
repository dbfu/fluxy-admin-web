import { IconYanzhengma01 } from '@/assets/icons/yanzhengma01';
import LinkButton from '@/components/link-button';
import { t } from '@/utils/i18n';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import useLogin from '../hooks/use-login';

function LoginForm({
  onForgetPasswordClick,
}: {
  onForgetPasswordClick: () => void;
}) {

  const { captcha, refreshCaptcha, login, loginLoading } = useLogin();

  return (
    <Form
      className="login-form"
      initialValues={{ accountNumber: 'admin', password: '123456' }}
      onFinish={login}
      size="large"
    >
      <Form.Item
        name="accountNumber"
        rules={[{ required: true, message: t("wVzXBuYs" /* 请输入账号 */) }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder={t("RNISycbR" /* 账号 */)}
          size="large"
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
      <Form.Item
        name="captcha"
        rules={[{ required: true, message: '请输入验证码' }]}
      >
        <Input
          prefix={<IconYanzhengma01 className='text-[20px]' />}
          placeholder="验证码"
          suffix={(
            <img
              className='cursor-pointer'
              src={captcha?.imageBase64}
              onClick={refreshCaptcha}
            />
          )}
        />
      </Form.Item>
      <Form.Item noStyle style={{ marginBottom: 0 }} >
        <div
          className='text-right mb-[18px]'
        >
          <LinkButton
            onClick={onForgetPasswordClick}
          >
            忘记密码？
          </LinkButton>
        </div>
      </Form.Item>
      <Form.Item style={{ marginBottom: 18 }}>
        <Button
          type="primary"
          loading={loginLoading}
          block
          htmlType='submit'
        >
          {t("dDdqAAve" /* 登录 */)}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm