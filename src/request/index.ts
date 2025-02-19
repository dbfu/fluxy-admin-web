import { AxiosRequestConfig } from 'axios';
import request from './axios';

// 这个是为了给
function axios<T = any, D = any>(url: string, config: AxiosRequestConfig<D>): Promise<T> {
  config.url = url;
  return request.request(config);
}

export default axios;