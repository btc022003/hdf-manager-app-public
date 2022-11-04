import { get, post, patch, del } from '../utils/request';

/**
 * 获取列表
 * @param query
 * @returns
 */
export const loadDataAPI = (query: any = {}) => get('/admin/medicines', query);

/**
 * 根据id获取一个
 * @param id
 * @returns
 */
export const loadDataByIdAPI = (id: string) => get('/admin/medicines/' + id);

/**
 * 新增
 * @param data
 * @returns
 */
export const insertAPI = (data: any) => post('/admin/medicines', data);

/**
 * 根据id修改
 * @param id
 * @param data
 * @returns
 */
export const updateByIdAPI = (id: string, data: any) =>
  patch('/admin/medicines/' + id, data);

/**
 * 根据id删除
 * @param id
 * @returns
 */
export const delByIdAPI = (id: string) => del('/admin/medicines/' + id);

/**
 * 删除多个
 * @param ids 多个id使用,分割
 * @returns
 */
export const delManyByIds = (ids: string) =>
  del('/admin/medicines/remove_many?ids=' + ids);
