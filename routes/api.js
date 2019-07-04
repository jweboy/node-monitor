const Router = require('koa-router');
const { reportList } = require('../models/interface');

const router = new Router();

async function getInterfaceList(ctx) {
	const { status = 'failed', keyword = '', method = '', page, size } = ctx.query;

	ctx.body = await reportList({
		methods: method !== '' ? method.split(',') : [],
		status: status !== '' ? status.split(',') : [],
		keyword: keyword !== '' ? keyword.replace(/\//g, '\\/') : keyword,
		page,
		size,
	});
}

router.get('/api/list', getInterfaceList);

module.exports = router;
