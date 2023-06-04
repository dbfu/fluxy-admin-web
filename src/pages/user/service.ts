import axios from 'axios'

export interface User {
  id: number;
  userName: string;
  nickName: string;
  phoneNumber: string;
  email: string;
  createDate: string;
  updateDate: string;
}

export interface PageData {
  data: User[],
  total: number;
}

const userService = {
  // 分页获取用户列表
  getUserListByPage: ({ current, pageSize }: { current: number, pageSize: number }, formData: any) => {
    return axios.get<PageData>('/api/user/page', {
      params: {
        page: current - 1,
        size: pageSize,
        ...formData,
      }
    }).then(({ data }) => {
      return ({
        list: data.data,
        total: data.total,
      })
    })
  },
  // 添加用户
  addUser: (data: User) => {
    return axios.post('/api/user', data);
  },
  // 更新用户
  updateUser: (data: User) => {
    return axios.put('/api/user', data);
  },
  // 删除用户
  deleteUser: (id: number) => {
    return axios.delete(`/api/user/${id}`);
  }
}

export default userService;
