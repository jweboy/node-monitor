/*
 * @Author: jweboy
 * @Date: 2019-11-23 14:03:03
 * @LastEditors: jweboy
 * @LastEditTime: 2019-11-24 00:54:06
 */
// import Router from'koa-router';
// const router = new Router();
import { findAllInterface, findOneInterface } from '../models/interface';
import response from '../utils/response';

async function getInterfaceList(ctx) {
  const { status = 'failed', keyword = '', method = '', page, size } = ctx.query;

  const data = await findAllInterface({
    methods: method !== '' ? method.split(',') : [],
    status: status !== '' ? status.split(',') : [],
    keyword: keyword !== '' ? keyword.replace(/\//g, '\\/') : keyword,
    page,
    size,
  });

  ctx.body = { ...response, data };
}

async function getInterfaceDetail(ctx) {
  const { id } = ctx.params;
  const data = await findOneInterface(id);

  ctx.body = { ...response, data };
}

// router
// .get('/api/a', getInterfaceList);
// router.get('/interface/:id', renderDetail);

export {
  getInterfaceList,
  getInterfaceDetail,
};
