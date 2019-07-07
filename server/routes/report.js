const Router = require('koa-router');
const { logger } = require('jweboy-utils');
const { createReport } = require('../models/interface');
const errorException = require('../models/error-exception');

const router = new Router();

async function postInterface(ctx) {
	const { body } = ctx.request;
	const { status, info , ...restProps } = body;
	const logMap = { succeed: 'info', failed: 'error' };

	logger[logMap[status]](JSON.stringify(body));
	ctx.body = await createReport({
		...restProps,
		info: JSON.stringify(info),
		status,
	});
}

async function postErrorException(ctx) {
	const { body } = ctx.request;

	ctx.body = await errorException.create(body);
}

router
	.post('/report/interface', postInterface)
	.post('/report/error-exception', postErrorException);

module.exports = router;
