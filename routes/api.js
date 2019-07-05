const Router = require('koa-router');
const { reportList } = require('../models/interface');
const errorException = require('../models/error-exception');

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

async function getErrorExceptionList(ctx) {
	ctx.body = await errorException.findAll();
}

router
	.get('/api/list', getInterfaceList)
	.get('/api/error-exception/list', getErrorExceptionList);

module.exports = router;
