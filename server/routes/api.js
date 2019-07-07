const Router = require('koa-router');
const { reportList, reportDetail } = require('../models/interface');
const errorException = require('../models/error-exception');
const lookupSourceMap = require('../utils/source-map');
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
	.get('/api/interface', getInterfaceList)
	.get('/api/interface/:id', async (ctx) => {
        const { id } = ctx.params;

		ctx.body = await reportDetail(id);
	})
    .get('/api/error-exception', getErrorExceptionList)
    .get('/api/error-exception/:id', async (ctx) =>  {
        const { id } = ctx.params;
        const data = await errorException.findOne(id);
        const { line, column, ...restProps} =  await lookupSourceMap(data.lineNo, data.columnNo);

        ctx.body = {
            ...data.toObject(),
            lineNo: line,
            columnNo: column,
            ...restProps,
        };
    });

module.exports = router;
