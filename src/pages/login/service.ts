import request from '@/request';
import axios from 'axios';

export interface LoginDTO {
  accountNumber: string;
  password: string;
  captchaId: string;
  captcha: string;
  publicKey: string;
}

export interface TokenDTO {
  expire: number;
  token: string;
  refreshExpire: number;
  refreshToken: string;
}

export interface CaptchaDTO {
  id: string;
  imageBase64: string
}

const loginService = {
  // 登录
  login: (loginDTO: LoginDTO) => {
    return axios.post<TokenDTO>('/api/auth/login', loginDTO);
  },
  // 获取验证码
  getCaptcha: () => {
    return axios.get<CaptchaDTO>('/api/auth/captcha');
  },
  // 获取验证码
  getPublicKey: () => {
    return axios.get<string>('/api/auth/publicKey');
  },
  // 刷新token
  rerefshToken(refreshToken: string) {
    return request.post<TokenDTO>('/api/auth/refresh/token', { refreshToken });
  },
  // 退出登录
  logout() {
    return request.post<TokenDTO>('/api/auth/logout');
  }
}

export default loginService;