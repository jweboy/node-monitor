import { RouteComponentProps } from 'react-router';

/*
 * @Author: jweboy
 * @Date: 2019-11-02 23:51:35
 * @LastEditors: jweboy
 * @LastEditTime: 2019-11-09 22:11:04
 */



export interface InterfaceDto {
  id?: string;
  method?: string;
  code?: number;
  url?: string;
  status?: string;
  req_time?: number;
  create_time?: string;
  user_agent?: string;
  params?: string;
  err_msg?: string;
}

// 定义列表的 props
// export interface InterfaceListProps {}

// 定义列表的 query
export interface InterfaceListQuery {
  method?: string[];
  status?: string;
  page?: number;
  size?: number;
  keyword?: string;
}

// 定义列表的 state
export interface InterfaceListState {
  data?: InterfaceDto[];
  filters?: InterfaceListQuery;
  total?: number;
}


// 定义详情的 state
export interface InterfaceDetailState extends InterfaceDto{}

// 定义详情路由的 params
export interface InterfaceDetailMatchParams {
  id: string;
}

// 定义详情的 props
export interface InterfaceDetailProps extends RouteComponentProps<InterfaceDetailMatchParams>{}


