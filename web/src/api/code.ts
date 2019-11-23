/*
 * @Author: jweboy
 * @Date: 2019-11-08 20:27:01
 * @LastEditors: jweboy
 * @LastEditTime: 2019-11-09 21:48:02
 */
import request from '../utils/request';
import { ListResponse } from 'src/types/list';
import { CodeDto } from 'src/types/code';

export const getCodeList = () => {
  return request.get<ListResponse>('/code');
};

export const getCodeDetail = (id: string) => {
  return request.get<CodeDto>(`/code/${id}`);
};
