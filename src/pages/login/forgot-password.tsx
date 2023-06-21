import { t } from '@/utils/i18n';
import { LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, Carousel, App } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGlobalStore } from '@/stores/global';
import { useRequest } from 'ahooks'
import { JSEncrypt } from "jsencrypt"

import loginService, { LoginDTO } from './service';

import './index.css'

const ForgotPassword = () => {

  const { setToken, setRefreshToken } = useGlobalStore();
  const { message } = App.useApp();

  const navigate = useNavigate();

  const { runAsync: login, loading } = useRequest(loginService.login, { manual: true });
  const { data: captcha, refresh: refreshCaptcha } = useRequest(loginService.getCaptcha);
  const { runAsync: getPublicKey } = useRequest(loginService.getPublicKey, { manual: true });

  const onFinish = async (values: LoginDTO) => {
    if (!captcha?.data) {
      return;
    }

    values.captchaId = captcha.data.id;
    try {

      // 获取公钥
      const { data: publicKey } = await getPublicKey();

      // 使用公钥对密码加密
      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(publicKey);
      const password = encrypt.encrypt(values.password);

      if (!password) {
        return;
      }

      values.password = password;
      values.publicKey = publicKey;

      const { data } = await login(values);

      useGlobalStore.setState({
        refreshToken: data.refreshToken,
        token: data.token,
      })
      setRefreshToken(data.refreshToken);
      setToken(data.token);

      navigate('/');
    } catch (error: any) {
      refreshCaptcha();
      message.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="bg-primary light:bg-[rgb(238,242,246)] bg-[rgb(238,242,246)] flex justify-center items-center h-[100vh]">
      <div className='flex-[2.5] flex justify-center'>
        <div className='dark:bg-[rgb(33,41,70)] w-[400px] px-[32px] py-[20px] mt-[-12%] bg-white rounded-lg <lg:(w-[94%] mx-auto)'>
          <div className='mb-[32px]'>
            <div className='flex gap-2'>
              <h2 className='text-[rgb(124,77,255)]' style={{ marginBottom: '0.6em' }}>重置密码</h2>
            </div>
            <div className='text-[16px]' >设置你的新密码</div>
          </div>
          <Form
            name="super-admin"
            className="login-form"
            initialValues={{ accountNumber: 'admin', password: '123456' }}
            onFinish={onFinish}
            size="large"
          >
            <Form.Item
              name="accountNumber"
              rules={[{ required: true, message: t("wVzXBuYs" /* 请输入账号 */) }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder={t("HplkKxdY" /* 密码 */)}
                size="large"
                type="password"
              />
            </Form.Item>
            <Form.Item
              name="password"
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
          </Form>
        </div>
      </div>
      <div
        className='flex-[1.7] dark:bg-[rgb(33,41,70)] bg-white h-[100vh] relative <lg:hidden'
        style={{
          backgroundImage: 'url(./images/login-right-bg.svg)'
        }}
      >
        <div
          className='img1 w-[243px] h-[210px] bg-center absolute top-[23%] left-[37%]'
          style={{
            backgroundSize: 380,
            backgroundImage: 'url(./images/login-right-before.svg)'
          }}
        />
        <div
          className='img2 w-[313px] h-[280px] bg-center absolute top-[32%] left-[40%]'
          style={{
            backgroundSize: 380,
            backgroundImage: 'url(./images/login-right-after.svg)'
          }}
        />
        <div className='absolute left-[100px] right-[100px] bottom-[50px] h-[200px]'>
          <Carousel autoplay dots={{ className: 'custom' }}>
            <div>
              <div className='h-[160px] bg-transparent flex items-center justify-center'>
                <div>
                  <h3 className='dark:text-[rgb(215,220,236)] text-[rgb(18,25,38)] text-[34px]'>
                    fluxy-admin
                  </h3>
                  <div className='dark:text-[rgb(132,146,196)] text-[rgb(105,117,134)] text-[12px] my-[20px] '>
                    一个高颜值后台管理系统
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className='h-[160px] bg-transparent flex items-center justify-center'>
                <div>
                  <h3 className='dark:text-[rgb(215,220,236)] text-[rgb(18,25,38)] text-[34px]'>
                    fluxy-admin
                  </h3>
                  <div className='dark:text-[rgb(132,146,196)] text-[rgb(105,117,134)] text-[12px] my-[20px]'>
                    一个高颜值后台管理系统
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className='h-[160px] bg-transparent flex items-center justify-center'>
                <div>
                  <h3 className='dark:text-[rgb(215,220,236)] text-[rgb(18,25,38)] text-[34px]'>
                    fluxy-admin
                  </h3>
                  <div className='dark:text-[rgb(132,146,196)] text-[rgb(105,117,134)] text-[12px] my-[20px] '>
                    一个高颜值后台管理系统
                  </div>
                </div>
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;