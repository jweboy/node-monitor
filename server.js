const Koa = require('koa');
const next = require('next');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const cors = require('@koa/cors');
const Ora = require('ora');
const chalk = require('chalk');
const { logger } = require('jweboy-utils');
const { createReport, reportList, reportDetail } = require('./models/interface');

require('dotenv').config();

const app = next({ dev: process.env.NODE_ENV === 'development' });
const reqHandler = app.getRequestHandler();
const spinner = new Ora();
const port = process.env.SERVER_PORT;
const protocol = process.env.SERVER_PROTOCOL;
const host = process.env.SERVER_HOST;
const DBURL = `mongodb://${process.env.DB_HOST}:27017/monitor`;

app.prepare().then(() => {
	const server = new Koa();
	const router = new Router();

	router.get('/api/list', async (ctx) => {
		const { status = 'failed', keyword = '', method = '', page, size } = ctx.query;

		ctx.body = await reportList({
			methods: method !== '' ? method.split(',') : [],
			status: status !== '' ? status.split(',') : [],
			keyword: keyword !== '' ? keyword.replace(/\//g, '\\/') : keyword,
			page,
			size,
		});
	});

	router.get('/interface/report', async (ctx) => {
		const list = await reportList({ status: 'failed' });

		await app.render(ctx.req, ctx.res, '/interface-report/list', { list });
		ctx.respond = false;
	});

	router.get('/interface/report/:id', async (ctx) => {
		const { id } = ctx.params;
		const detail = await reportDetail(id);
		await app.render(ctx.req, ctx.res, '/interface-report/detail', detail);
		ctx.respond = false;
	});

	router.post('/report/api', async (ctx) => {
		const { body } = ctx.request;
		const { status, info , ...restProps } = body;
		const logMap = { succeed: 'info', failed: 'error' };

		logger[logMap[status]](JSON.stringify(body));
		ctx.body = await createReport({
			...restProps,
			info: JSON.stringify(info),
			status,
		});
	});

	router.get('/', async (ctx) => {
		await app.render(ctx.req, ctx.res, '/home');
		ctx.respond = false;
	});

	// 没有配置 nginx 需要指定静态文件
	router.get('*', async (ctx) => {
		await reqHandler(ctx.req, ctx.res);
		ctx.respond = false;
	});

	// connect database
	mongoose.connect(DBURL, {
		useNewUrlParser: true, // 新解析器中发现错误就回退到旧解析器
	}).then(() => {
		logger.info('Database connection is successful.');
		spinner.succeed(chalk.green('Database connection is successful.'));
	}).catch((err) => {
		spinner.fail(chalk.red(err.message));
		process.exit(1);
	});

	// connect server
	server
		.use(bodyParser())
		.use(cors())
		.use(router.routes())
		.listen(port, () => {
			logger.info(`Server is running at ${protocol}://${host}:${port}`);
			spinner.succeed(chalk.green(`Server is running at ${protocol}://${host}:${port}`));
		});
});

process.on('unhandledRejection', err => {
	throw err;
});
