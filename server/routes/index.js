/*
 * @Author: jweboy
 * @Date: 2019-11-23 14:03:03
 * @LastEditors: jweboy
 * @LastEditTime: 2019-11-24 00:53:31
 */
import Router from 'koa-router';
import { getInterfaceList, getInterfaceDetail } from './interface';
import { getCodeList, getCodeDetail } from './code';
import { postInterface, postCode } from './report';
// import lookupSourceMap from '../utils/source-map';

const router = new Router();

function mainRoute(ctx) {
  ctx.body = '监控系统API服务';
}

router
  .prefix('/api')
  .get('/', mainRoute)
  .get('/interface', getInterfaceList)
  .get('/interface/:id', getInterfaceDetail)
  .get('/code', getCodeList)
  .get('/code/:id', getCodeDetail)
  .post('/report/interface', postInterface)
  .post('/report/code', postCode);
// .delete('/api/error-exception', async (ctx) => {
// 	await errorException.removeAll();
// 	ctx.body = '';
// });

export default router;
