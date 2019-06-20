const Koa = require('koa');
const next = require('next');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const cors = require('@koa/cors');
const Ora = require('ora');
const chalk = require('chalk');
const { logger } = require('jweboy-utils');
const { createReport, reportList, reportDetail } = require('./models/api-report');

require('dotenv').config();

const app = next({ dev: process.env.NODE_ENV === 'production' });
const reqHandler = app.getRequestHandler();
const spinner = new Ora();
const PORT = 4004 || process.env.PORT;
const PROTOCOL = 'http' || process.env.PROTOCOL;
const DOMAIN = 'localhost' || process.env.DOMAIN;
const DBURL = `mongodb://${process.env.DB_HOST}:27017/monitor`;

app.prepare().then(() => {
	const server = new Koa();
	const router = new Router();

	router.get('/dashboard/interface/report', async (ctx) => {
		const list = await reportList();

		await app.render(ctx.req, ctx.res, '/interface-report/list', list);
		ctx.respond = false;
	});

	router.get('/dashboard/interface/report/:id', async (ctx) => {
		const { id } = ctx.params;
		const detail = await reportDetail(id);
		await app.render(ctx.req, ctx.res, '/interface-report/detail', detail);
		ctx.respond = false;
	});

	router.post('/report/api', async (ctx) => {
		const { body } = ctx.request;
		const { info , ...restProps } = body;

		logger.error(JSON.stringify(body));
		ctx.body = await createReport({
			...restProps,
			info: JSON.stringify(info),
		});
	});

	// router.post('/report/api/performance', async (ctx) => {
	// 	const { body } = ctx.request;
	// 	logger.info(JSON.stringify(body));
	// 	ctx.body = await createReport({
	// 		...restProps,
	// 		info: JSON.stringify(info),
	// 	});
	// });

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
		.listen(PORT, () => {
			logger.info(`Server is running at ${PROTOCOL}://${DOMAIN}:${PORT}`);
			spinner.succeed(chalk.green(`Server is running at ${PROTOCOL}://${DOMAIN}:${PORT}`));
		});
});

process.on('unhandledRejection', err => {
	throw err;
});
