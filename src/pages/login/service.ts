import request from '@/request';

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
  imageBase64: string;
}

export interface ResetPasswordDTO {
  password: string;
  email: string;
  emailCaptcha: string;
  publicKey: string;
  confirmPassword?: string;
}

const loginService = {
  // 登录
  login: (loginDTO: LoginDTO) => {
    return request.post<TokenDTO>('/api/auth/login', loginDTO);
  },
  // 获取验证码
  getCaptcha: () => {
    return request.get<CaptchaDTO>('/api/auth/captcha');
  },
  // 获取验证码
  getPublicKey: () => {
    return request.get<string>('/api/auth/publicKey');
  },
  // 刷新token
  refreshToken(refreshToken: string) {
    return request.post<TokenDTO>('/api/auth/refresh/token', { refreshToken });
  },
  // 退出登录
  logout() {
    return request.post<TokenDTO>('/api/auth/logout');
  },
  // 退出登录
  sendResetPasswordEmail(email: string) {
    return request.post('/api/auth/send/reset/password/email', { email });
  },
  // 退出登录
  resetPassword(resetPasswordDTO: ResetPasswordDTO) {
    return request.post('/api/auth/reset/password', resetPasswordDTO);
  },
};

export default loginService;
