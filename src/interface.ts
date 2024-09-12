export interface PageData<T> {
  data: T[];
  total: number;
}

export interface PageParams {
  current?: number;
  pageSize?: number;
}

export interface PageRequestParams {
  page: number;
  size: number;
}

export interface SystemSettingType {
  title: string;
  headerHeight: number;
  slideWidth: number;
  collapsedSlideWidth: number;
  mobileMargin: number;
  showKeepAliveTab: boolean;
  primaryColor: string;
  filterType: 'light' | 'query';
  showFormType: 'modal' | 'drawer';
  showWatermark: boolean;
  watermarkPos: 'full' | 'content';
  languages: {
    key: string;
    name: string;
  }[];
  defaultLang: string;
}