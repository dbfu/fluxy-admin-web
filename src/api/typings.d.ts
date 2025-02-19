declare namespace API {
  type ApiDTO = {
    /** 接口url */
    path?: string;
    /** 接口请求方式 */
    method?: string;
  };

  type ApiLogDTO = {
    id?: string;
  };

  type apiLogGetBodyDataParams = {
    id?: string;
  };

  type apiLogGetByIdParams = {
    id: string;
  };

  type apiLogGetQueryDataParams = {
    id?: string;
  };

  type apiLogGetResultDataParams = {
    id?: string;
  };

  type ApiLogPageDTO = {
    /** 页码 */
    page?: number;
    /** 每页数量 */
    size?: number;
    /** 请求地址 */
    url?: string;
    /** 请求方式 */
    method?: string;
    /** 是否成功 */
    success?: boolean;
    /** 请求开始时间起始时间 */
    startTimeStart?: string;
    /** 请求开始时间结束时间 */
    startTimeEnd?: string;
    /** 请求结束时间起始时间 */
    endTimeStart?: string;
    /** 请求结束时间结束时间 */
    endTimeEnd?: string;
    /** 耗时开始 */
    durationStart?: number;
    /** 耗时结束 */
    durationEnd?: number;
    /** 请求IP */
    ip?: string;
    /** 错误码 */
    errorType?: string;
  };

  type apiLogPageParams = {
    /** 页码 */
    page?: number;
    /** 每页数量 */
    size?: number;
    /** 请求地址 */
    url?: string;
    /** 请求方式 */
    method?: string;
    /** 是否成功 */
    success?: boolean;
    /** 请求开始时间起始时间 */
    startTimeStart?: string;
    /** 请求开始时间结束时间 */
    startTimeEnd?: string;
    /** 请求结束时间起始时间 */
    endTimeStart?: string;
    /** 请求结束时间结束时间 */
    endTimeEnd?: string;
    /** 耗时开始 */
    durationStart?: number;
    /** 耗时结束 */
    durationEnd?: number;
    /** 请求IP */
    ip?: string;
    /** 错误码 */
    errorType?: string;
  };

  type ApiLogPageVO = {
    /** 数据 */
    data?: ApiLogVO[];
    /** 总条数 */
    total?: number;
  };

  type apiLogRemoveParams = {
    id: string;
  };

  type ApiLogVO = {
    /** id */
    id?: string;
    /** 创建时间 */
    createDate?: string;
    /** 更新时间 */
    updateDate?: string;
    /** 接口url */
    url?: string;
    /** 请求方式 */
    method?: string;
    /** 是否成功 */
    success?: boolean;
    /** 请求query参数 */
    query?: string;
    /** 请求body参数 */
    body?: string;
    /** 开始时间 */
    startTime?: string;
    /** 结束时间 */
    endTime?: string;
    /** 耗时 */
    duration?: number;
    /** 响应结果 */
    result?: string;
    /** 请求ip */
    ip?: string;
    /** 错误类型 */
    errorType?: string;
    /** 错误消息 */
    errorMsg?: string;
    /** 用户Id */
    userId?: string;
    /** 用户名 */
    userName?: string;
  };

  type ApiPageVo = {
    /** 数据 */
    data?: ApiVO[];
    /** 总条数 */
    total?: number;
  };

  type ApiVO = {
    /** 接口url */
    path?: string;
    /** 接口前缀 */
    prefix?: string;
    /** 接口名称 */
    title?: string;
    /** 接口类型 */
    type?: string;
    /** 请求方式 */
    method?: string;
  };

  type CaptchaVO = {
    /** id */
    id?: string;
    /** 验证码图片 base64 */
    imageBase64?: string;
  };

  type CurrentUserVO = {
    /** 用户ID */
    id?: string;
    /** 用户名称 */
    userName?: string;
    /** 用户昵称 */
    nickName?: string;
    /** 手机号 */
    phoneNumber?: string;
    /** 邮箱 */
    email?: string;
    /** 性别（0:女，1:男） */
    sex?: number;
    /** 头像地址 */
    avatarPath?: string;
    /** 头像 */
    avatarEntity?: FileEntity;
    /** 角色列表 */
    roles?: RoleVO[];
    /** 用户分配的菜单列表 */
    menus?: MenuVO[];
  };

  type FileEntity = {
    /** id */
    id?: string;
    /** 创建时间 */
    createDate?: string;
    /** 更新时间 */
    updateDate?: string;
    /** 文件名 */
    fileName?: string;
    /** 文件路径 */
    filePath?: string;
    /** 外健名称 */
    pkName?: string;
    /** 外健值 */
    pkValue?: string;
  };

  type LoginDTO = {
    /** 登录账号 */
    accountNumber?: string;
    /** 登录密码 */
    password?: string;
    /** 验证码key */
    captchaId?: string;
    /** 验证码 */
    captcha?: string;
  };

  type LoginLogDTO = {
    id?: string;
    /** 代码 */
    code?: string;
    /** 名称 */
    name?: string;
  };

  type loginLogGetByIdParams = {
    id: string;
  };

  type LoginLogPageDTO = {
    /** 页码 */
    page?: number;
    /** 每页数量 */
    size?: number;
    /** 用户名 */
    userName?: string;
  };

  type loginLogPageParams = {
    /** 页码 */
    page?: number;
    /** 每页数量 */
    size?: number;
    /** 用户名 */
    userName?: string;
  };

  type loginLogRemoveParams = {
    id: string;
  };

  type LoginLogVO = {
    /** id */
    id?: string;
    /** 创建时间 */
    createDate?: string;
    /** 更新时间 */
    updateDate?: string;
    /** 用户名 */
    userName?: string;
    /** 登录ip */
    ip?: string;
    /** 登录地点 */
    address?: string;
    /** 浏览器 */
    browser?: string;
    /** 操作系统 */
    os?: string;
    /** 登录状态 */
    status?: boolean;
    /** 登录消息 */
    message?: string;
  };

  type MenuApiEntity = {
    /** id */
    id?: string;
    /** 创建时间 */
    createDate?: string;
    /** 更新时间 */
    updateDate?: string;
    /** 菜单id */
    menuId?: string;
    /** 请求方式 */
    method?: string;
    /** 请求url */
    path?: string;
  };

  type menuChildrenParams = {
    parentId?: string;
  };

  type MenuDTO = {
    id?: string;
    /** 父级菜单id */
    parentId?: string;
    /** 菜单名称 */
    name?: string;
    /** 菜单icon */
    icon?: string;
    /** 菜单类型 */
    type?: number;
    /** 菜单路由 */
    route?: string;
    /** 本地组件地址 */
    filePath?: string;
    /** 菜单排序 */
    orderNumber?: number;
    /** 菜单url */
    url?: string;
    /** 是否在菜单中显示 */
    show?: boolean;
    /** 权限码 */
    authCode?: string;
    /** 低代码页面配置数据 */
    pageSetting?: string;
    /** 已分配接口列表 */
    apis?: ApiDTO[];
  };

  type MenuEntity = {
    /** id */
    id?: string;
    /** 创建时间 */
    createDate?: string;
    /** 更新时间 */
    updateDate?: string;
    /** 上级id */
    parentId?: string;
    /** 名称 */
    name?: string;
    /** 图标 */
    icon?: string;
    /** 类型 */
    type?: number;
    /** 路由 */
    route?: string;
    /** 本地组件地址 */
    filePath?: string;
    /** 排序号 */
    orderNumber?: number;
    /** url */
    url?: string;
    /** 是否在菜单中显示 */
    show?: boolean;
    /** 按钮权限代码 */
    authCode?: string;
    /** 低代码页面当前版本号 */
    curVersion?: string;
  };

  type menuGetAllocAPIByMenuParams = {
    menuId?: string;
  };

  type menuPageParams = {
    /** 页码 */
    page?: number;
    /** 每页数量 */
    size?: number;
  };

  type MenuPageVO = {
    /** 数据 */
    data?: MenuVO[];
    /** 总条数 */
    total?: number;
  };

  type menuRemoveParams = {
    id: string;
  };

  type MenuVO = {
    /** id */
    id?: string;
    /** 创建时间 */
    createDate?: string;
    /** 更新时间 */
    updateDate?: string;
    /** 上级id */
    parentId?: string;
    /** 名称 */
    name?: string;
    /** 图标 */
    icon?: string;
    /** 类型 */
    type?: number;
    /** 路由 */
    route?: string;
    /** 本地组件地址 */
    filePath?: string;
    /** 排序号 */
    orderNumber?: number;
    /** url */
    url?: string;
    /** 是否在菜单中显示 */
    show?: boolean;
    /** 按钮权限代码 */
    authCode?: string;
    /** 低代码页面当前版本号 */
    curVersion?: string;
    /** 子菜单 */
    hasChild?: boolean;
  };

  type PageDTO = {
    /** 页码 */
    page?: number;
    /** 每页数量 */
    size?: number;
  };

  type RefreshTokenDTO = {
    /** 刷新token */
    refreshToken?: string;
  };

  type ResetPasswordDTO = {
    /** 密码 */
    password?: string;
    /** 邮箱 */
    email?: string;
    /** 邮箱验证码 */
    emailCaptcha?: string;
  };

  type RoleDTO = {
    id?: string;
    /** 角色编码 */
    code?: string;
    /** 角色名称 */
    name?: string;
    /** 分配菜单列表 */
    menuIds?: string[];
  };

  type RoleEntity = {
    /** id */
    id?: string;
    /** 创建时间 */
    createDate?: string;
    /** 更新时间 */
    updateDate?: string;
    /** 名称 */
    name?: string;
    /** 代码 */
    code?: string;
  };

  type roleGetMenusByRoleIdParams = {
    id?: string;
  };

  type RoleMenuDTO = {
    /** 角色id */
    roleId?: string;
    /** 菜单id列表 */
    menuIds?: string[];
  };

  type RolePageDTO = {
    /** 页码 */
    page?: number;
    /** 每页数量 */
    size?: number;
    /** 角色编码 */
    code?: string;
    /** 角色名称 */
    name?: string;
  };

  type rolePageParams = {
    /** 页码 */
    page?: number;
    /** 每页数量 */
    size?: number;
    /** 角色编码 */
    code?: string;
    /** 角色名称 */
    name?: string;
  };

  type RolePageVO = {
    /** 数据 */
    data?: RoleVO[];
    /** 总条数 */
    total?: number;
  };

  type roleRemoveParams = {
    id: string;
  };

  type RoleVO = {
    /** id */
    id?: string;
    /** 创建时间 */
    createDate?: string;
    /** 更新时间 */
    updateDate?: string;
    /** 名称 */
    name?: string;
    /** 代码 */
    code?: string;
  };

  type TokenVO = {
    /** token的过期时间 */
    expire?: number;
    /** token */
    token?: string;
    /** 刷新token的过期时间 */
    refreshExpire?: number;
    /** 刷新token */
    refreshToken?: string;
  };

  type UserDTO = {
    id?: string;
    /** 用户名称 */
    userName?: string;
    /** 用户昵称 */
    nickName?: string;
    /** 手机号 */
    phoneNumber?: string;
    /** 邮箱 */
    email?: string;
    /** 头像 */
    avatar?: string;
    /** 性别（0:女，1:男） */
    sex?: number;
  };

  type userGetByIdParams = {
    id: string;
  };

  type UserPageDTO = {
    /** 页码 */
    page?: number;
    /** 每页数量 */
    size?: number;
    /** 用户名称 */
    userName?: string;
    /** 用户昵称 */
    nickName?: string;
    /** 手机号 */
    phoneNumber?: string;
    /** 邮箱 */
    email?: string;
  };

  type userPageParams = {
    /** 页码 */
    page?: number;
    /** 每页数量 */
    size?: number;
    /** 用户名称 */
    userName?: string;
    /** 用户昵称 */
    nickName?: string;
    /** 手机号 */
    phoneNumber?: string;
    /** 邮箱 */
    email?: string;
  };

  type UserPageVO = {
    /** 数据 */
    data?: UserVO[];
    /** 总条数 */
    total?: number;
  };

  type userRemoveParams = {
    id: string;
  };

  type UserVO = {
    /** 用户ID */
    id?: string;
    /** 用户名称 */
    userName?: string;
    /** 用户昵称 */
    nickName?: string;
    /** 手机号 */
    phoneNumber?: string;
    /** 邮箱 */
    email?: string;
    /** 性别（0:女，1:男） */
    sex?: number;
    /** 头像地址 */
    avatarPath?: string;
    /** 头像 */
    avatarEntity?: any;
    /** 角色列表 */
    roles?: any;
  };
}
