import logo from '../assets/logo.jpeg';

export const defaultImg = logo;

/**
 * 服务器地址
 */
export const serverUrl = 'http://localhost:3006';

/**
 * 设置token
 * @param token
 * @returns
 */
export const setToken = (token: string) =>
  sessionStorage.setItem('token', token);

/**
 * 获取token
 * @returns
 */
export const getToken = () => sessionStorage.getItem('token');
