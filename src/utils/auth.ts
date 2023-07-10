import {useUserStore} from '@/stores/global/user';

/**
 * 判断是否有权限
 * @param authCode 权限代码
 * @returns
 */
export const isAuth = (authCode: string) => {
  if (!authCode) return false;
  // 从全局数据中获取当前用户按钮权限列表
  const {currentUser} = useUserStore.getState();

  const {authList = []} = currentUser || {};
  // 判断传进来权限代码是否存在权限列表中
  return authList.includes(authCode);
};
