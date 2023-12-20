export enum MenuType {
  DIRECTORY = 1,
  MENU,
  BUTTON,
  LowCodePage,
}

export const MenuTypeName = {
  [MenuType.DIRECTORY.toString()]: '目录',
  [MenuType.MENU.toString()]: '菜单',
  [MenuType.BUTTON.toString()]: '按钮',
};
