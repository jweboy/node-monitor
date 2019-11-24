/*
 * @Author: jweboy
 * @Date: 2019-11-23 14:03:03
 * @LastEditors: jweboy
 * @LastEditTime: 2019-11-24 00:35:58
 */
// import Router from'koa-router';
// import { logger } from'jweboy-utils';
import interfaceModel from'../models/interface';
import codeModel from'../models/code';

// const router = new Router();


async function postInterface(ctx) {
  const { body } = ctx.request;
  const { status, info , ...restProps } = body;
  // const logMap = { succeed: 'info', failed: 'error' };

  // logger[logMap[status]](JSON.stringify(body));
  ctx.body = await interfaceModel.create({
    ...restProps,
    info: JSON.stringify(info),
    status,
  });
}

async function postCode(ctx) {
  const { body } = ctx.request;

  ctx.body = await codeModel.create(body);
}

export {
  postInterface,
  postCode,
};
