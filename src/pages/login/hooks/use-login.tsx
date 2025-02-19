import { auth_getImageCaptcha, auth_getPublicKey, auth_login } from '@/api/auth';
import { useSelector } from '@/hooks/use-selector';
import { router } from '@/router';
import { useGlobalStore } from '@/stores/global';
import { useSettingStore } from '@/stores/setting';
import { useRequest } from 'ahooks';
import to from 'await-to-js';
import { JSEncrypt } from "jsencrypt";
const useLogin = () => {

  const { showKeepAliveTab } = useSettingStore(
    useSelector('showKeepAliveTab')
  )

  const { data: captcha, refresh: refreshCaptcha } = useRequest(
    auth_getImageCaptcha
  );

  const { runAsync: login, loading: loginLoading } = useRequest(
    auth_login,
    { manual: true }
  );

  async function loginHandle(values: API.LoginDTO & { publicKey: string }) {
    if (!captcha) {
      return;
    }

    values.captchaId = captcha.id;

    // 获取公钥
    const [error, publicKey] = await to(auth_getPublicKey());

    if (error) {
      return;
    }

    // 使用公钥对密码加密
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    const password = encrypt.encrypt(values.password!);

    if (!password) {
      return;
    }

    values.password = password;
    values.publicKey = publicKey;

    try {
      const data = await login(values);
      useGlobalStore.setState({
        refreshToken: data.refreshToken,
        token: data.token,
      });

      // 每次重新登录，清空keepAliveTabs
      if (showKeepAliveTab) {
        window.localStorage.removeItem('keepAliveTabs');
      }

      router.navigate('/');
    } catch {
      refreshCaptcha();
    }
  }


  return {
    captcha,
    refreshCaptcha,
    login: loginHandle,
    loginLoading
  }
}

export default useLogin;