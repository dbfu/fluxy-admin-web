import { PageParams, PageRequestParams } from '@/interface';
import { FormInstance } from 'antd';
import { omit } from 'lodash';

export function getParamsBySearchParams<T = unknown>(query: URLSearchParams) {
  const params = [...query.keys()].reduce<Record<string, unknown>>(
    (prev, cur: string) => {
      if (cur) {
        prev[cur] = query.get(cur);
      }
      return prev;
    },
    {}
  );
  return params as T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toPageRequestParams<T = Record<string, any>>(pageParams: PageParams & T): PageRequestParams & Omit<T, 'current' | 'pageSize'> {
  return {
    ...omit(pageParams, 'current', 'pageSize'),
    page: pageParams.current ? pageParams.current - 1 : 0,
    size: pageParams.pageSize || 20,
  };
}

export function clearFormValues(form: FormInstance) {
  form.setFieldsValue(Object.keys(form.getFieldsValue()).reduce((prev, cur) => ({ ...prev, [cur]: undefined }), {}));
}