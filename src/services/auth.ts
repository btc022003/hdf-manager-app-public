import { post } from '../utils/request';

type LoginData = {
  userName: string;
  password: string;
};

/**
 * 管理后台登录接口
 * @param data
 * @returns
 */
export const loginAPI = (data: LoginData) => post('/auth/admin_login', data);
