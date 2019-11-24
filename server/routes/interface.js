/*
 * @Author: jweboy
 * @Date: 2019-11-23 14:03:03
 * @LastEditors: jweboy
 * @LastEditTime: 2019-11-24 00:54:06
 */
// import Router from'koa-router';
// const router = new Router();
import { findAll, findOne } from'../models/interface';


async function getInterfaceList(ctx) {
  const { status = 'failed', keyword = '', method = '', page, size } = ctx.query;

  ctx.body = await findAll({
    methods: method !== '' ? method.split(',') : [],
    status: status !== '' ? status.split(',') : [],
    keyword: keyword !== '' ? keyword.replace(/\//g, '\\/') : keyword,
    page,
    size,
  });
}

async function getInterfaceDetail(ctx) {
  const { id } = ctx.params;

  ctx.body = await findOne(id);
}

// router
// .get('/api/a', getInterfaceList);
// router.get('/interface/:id', renderDetail);

export {
  getInterfaceList,
  getInterfaceDetail,
};
