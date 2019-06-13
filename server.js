const Koa = require('koa');
const next = require('next');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const cors = require('@koa/cors');
const { createReport, reportList, reportDetail } = require('./models/api-report');
const Ora = require('ora');
const chalk = require('chalk');
const { logger } = require('jweboy-utils');

const app = next({ dev: true });
const reqHandler = app.getRequestHandler();
const spinner = new Ora();
const PORT = 4002 || process.env.PORT;
const PROTOCOL = 'http' || process.env.PROTOCOL;
const DOMAIN = 'localhost' || process.env.DOMAIN;
const DB_URL = 'mongodb://localhost:27017/monitor';


app.prepare().then(() => {
	const server = new Koa();
	const router = new Router();

	router.get('/dashboard/interface', async (ctx) => {
		const list = await reportList();

		await app.render(ctx.req, ctx.res, '/interface/list', list);
		ctx.respond = false;
	});

	router.get('/dashboard/interface/detail/:id', async (ctx) => {
		const { id } = ctx.params;
		const detail = await reportDetail(id);
		await app.render(ctx.req, ctx.res, '/interface/detail', detail);
		ctx.respond = false;
	});

	router.post('/report', async (ctx) => {
		const { body } = ctx.request;
		const { info , ...restProps } = body;

		logger.error(JSON.stringify(body));
		ctx.body = await createReport({
			...restProps,
			info: JSON.stringify(info),
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
	mongoose.connect(DB_URL, {
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
