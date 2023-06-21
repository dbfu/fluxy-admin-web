import {User} from './pages/user/service';
import request from './request';

const userService = {
  getCurrentUserDetail() {
    return request.get<User>('/api/auth/current/user');
  },
};

export default userService;
