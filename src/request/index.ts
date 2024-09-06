/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGlobalStore } from '@/stores/global';
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios';
// import {router} from '@/router';
import loginService from '@/pages/login/service';
import { router } from '@/router/router-utils';
import { antdUtils } from '@/utils/antd';
import to from 'await-to-js';

const refreshTokenUrl = '/api/auth/refresh/token';

class Request {
  constructor(config?: CreateAxiosDefaults) {
    this.axiosInstance = axios.create(config);

    this.axiosInstance.interceptors.request.use(
      (axiosConfig: InternalAxiosRequestConfig) =>
        this.requestInterceptor(axiosConfig)
    );
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse<unknown, unknown>) =>
        this.responseSuccessInterceptor(response),
      (error: any) => this.responseErrorInterceptor(error)
    );
  }

  private axiosInstance: AxiosInstance;

  private refreshTokenFlag = false;
  private requestQueue: {
    resolve: any;
    config: any;
    type: 'request' | 'response';
  }[] = [];
  private limit = 3;

  private requestingCount = 0;

  setLimit(limit: number) {
    this.limit = limit;
  }

  private async requestInterceptor(
    axiosConfig: InternalAxiosRequestConfig
  ): Promise<any> {
    if ([refreshTokenUrl].includes(axiosConfig.url || '')) {
      return Promise.resolve(axiosConfig);
    }

    if (this.refreshTokenFlag || this.requestingCount >= this.limit) {
      return new Promise((resolve) => {
        this.requestQueue.push({
          resolve,
          config: axiosConfig,
          type: 'request',
        });
      });
    }

    this.requestingCount += 1;

    const { token } = useGlobalStore.getState();

    if (token) {
      axiosConfig.headers.Authorization = `Bearer ${token}`;
    }
    return Promise.resolve(axiosConfig);
  }

  private requestByQueue() {
    if (!this.requestQueue.length) return;

    Array.from({ length: this.limit - this.requestingCount }).forEach(
      async () => {
        const record = this.requestQueue.shift();
        if (!record) {
          return;
        }

        const { config, resolve, type } = record;
        if (type === 'response') {
          resolve(await this.request(config));
        } else if (type === 'request') {
          this.requestingCount += 1;
          const { token } = useGlobalStore.getState();
          config.headers.Authorization = `Bearer ${token}`;
          resolve(config);
        }
      }
    );
  }

  private async refreshToken() {
    const { refreshToken } = useGlobalStore.getState();

    if (!refreshToken) {
      this.toLoginPage();
    }


    const [error, data] = await to(loginService.refreshToken(refreshToken));

    if (error) {
      this.toLoginPage();
      return;
    }

    useGlobalStore.setState({
      refreshToken: data.refreshToken,
      token: data.token,
    });

    this.refreshTokenFlag = false;

    this.requestByQueue();
  }

  private async responseSuccessInterceptor(
    response: AxiosResponse<any, any>
  ): Promise<any> {
    if (response.config.url !== refreshTokenUrl) {
      this.requestingCount -= 1;
      if (this.requestQueue.length) {
        this.requestByQueue();
      }
    }

    return Promise.resolve(response.data);
  }

  private async responseErrorInterceptor(error: any): Promise<any> {
    this.requestingCount -= 1;
    const { config, status } = error?.response || {};

    if (status === 401) {
      return new Promise((resolve) => {
        this.requestQueue.unshift({ resolve, config, type: 'response' });
        if (this.refreshTokenFlag) return;

        this.refreshTokenFlag = true;
        this.refreshToken();
      });
    } else {
      antdUtils.notification.error({
        message: '出错了',
        description: error?.response?.data?.message,
      });
      return Promise.reject(error);
    }
  }

  private reset() {
    this.requestQueue = [];
    this.refreshTokenFlag = false;
    this.requestingCount = 0;
  }

  private toLoginPage() {
    router.navigate('/user/login');
    this.reset();
  }

  request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R> {
    return this.axiosInstance(config);
  }


  get<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T> {
    return this.axiosInstance.get(url, config);
  }

  post<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T> {
    return this.axiosInstance.post(url, data, config);
  }

  put<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T> {
    return this.axiosInstance.put(url, data, config);
  }

  delete<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T> {
    return this.axiosInstance.delete(url, config);
  }
}

const request = new Request({ timeout: 60 * 1000 * 5 });

export default request;
