/*
 * @Author: jweboy
 * @Date: 2019-11-08 20:27:01
 * @LastEditors: jweboy
 * @LastEditTime: 2019-11-17 10:31:24
 */
import { InterfaceListQuery, InterfaceDto } from '../types/interface';
import request from '../utils/request';
import { ListResponse } from 'src/types/list';

export const getInterfaceList = (params: InterfaceListQuery) => {
  return request.get<ListResponse>('/interface', { params });
};

export const getInterfaceDetail = (id: string) => {
  return request.get<InterfaceDto>(`/interface/${id}`);
};
