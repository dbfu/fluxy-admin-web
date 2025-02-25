import { AxiosRequestConfig } from 'axios';
import request from './axios';

function axios<T = any, D = any>(url: string, config: AxiosRequestConfig<D> & { requestType?: string }): Promise<T> {
  config.url = url;
  return request.request(config);
}

export default axios;