import { t } from '@/utils/i18n';
export enum MenuType {
  DIRECTORY = 1,
  MENU,
  BUTTON,
  LowCodePage,
}

export const MenuTypeName = {
  [MenuType.DIRECTORY.toString()]: t ("wuePkjHJ" /* 目录 */),
  [MenuType.MENU.toString()]: t ("mYuKCgjM" /* 菜单 */),
  [MenuType.BUTTON.toString()]: t ("ZJvOOWLP" /* 按钮 */),
};
