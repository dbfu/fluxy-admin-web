import { SystemSettingType } from './interface';

export const defaultSetting = {
  "primaryColor": "rgb(124,77,255)",
  "filterType": "light",
  "showFormType": "modal",
  "showKeepAliveTab": true,
  "title": "fluxy-admin",
  "headerHeight": 80,
  "slideWidth": 240,
  "collapsedSlideWidth": 112,
  "mobileMargin": 16,
  "languages": [
    {
      "key": "zh",
      "name": "中文"
    },
    {
      "key": "en",
      "name": "English"
    }
  ],
  "defaultLang": "zh"
} as SystemSettingType;
                