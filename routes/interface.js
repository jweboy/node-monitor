const Router = require('koa-router');
// const { reportList, reportDetail } = require('../models/interface');
// const app = require('../server');

const router = new Router();

// async function renderList(ctx) {
// 	const list = await reportList({ status: 'failed' });

// 	ctx.status = 200;
// 	await app.render(ctx.req, ctx.res, '/interface/list', { list });
// 	ctx.respond = false;
// 	ctx.body = 'hello';
// }

// async function renderDetail(ctx) {
// 	const { id } = ctx.params;
// 	const detail = await reportDetail(id);

// 	ctx.status = 200;
// 	await app.render(ctx.req, ctx.res, '/interface/detail', detail);
// 	ctx.respond = false;
// }

// router.get('/interface', renderList);
// router.get('/interface/:id', renderDetail);

module.exports = router;
