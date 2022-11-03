import { get, post, patch, del } from '../utils/request';

/**
 * 获取列表
 * @param query
 * @returns
 */
export const loadDataAPI = (query: any = {}) =>
  get('/admin/medicine_categories', query);

/**
 * 根据id获取一个
 * @param id
 * @returns
 */
export const loadDataByIdAPI = (id: string) =>
  get('/admin/medicine_categories/' + id);

/**
 * 新增
 * @param data
 * @returns
 */
export const insertAPI = (data: any) =>
  post('/admin/medicine_categories', data);

/**
 * 根据id修改
 * @param id
 * @param data
 * @returns
 */
export const updateByIdAPI = (id: string, data: any) =>
  patch('/admin/medicine_categories/' + id, data);

/**
 * 根据id删除
 * @param id
 * @returns
 */
export const delByIdAPI = (id: string) =>
  del('/admin/medicine_categories/' + id);

/**
 * 删除多个
 * @param ids 多个id使用,分割
 * @returns
 */
export const delManyByIds = (ids: string) =>
  del('/admin/medicine_categories/remove_many?ids=' + ids);
