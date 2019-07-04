const Koa = require('koa');
const next = require('next');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const cors = require('@koa/cors');
const Ora = require('ora');
const chalk = require('chalk');
const { logger } = require('jweboy-utils');
const { reportList, reportDetail } = require('./models/interface');
const registerRouter = require('./routes');

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

	router.get('/interface', async (ctx) => {
		const list = await reportList({ status: 'failed' });

		ctx.status = 200;
		await app.render(ctx.req, ctx.res, '/interface/list', { list });
		ctx.respond = false;
		ctx.body = 'hello';
	});

	router.get('/interface/:id', async (ctx) => {
		const { id } = ctx.params;
		const detail = await reportDetail(id);

		ctx.status = 200;
		await app.render(ctx.req, ctx.res, '/interface/detail', detail);
		ctx.respond = false;
	});

	router.get('/', async (ctx) => {
		await app.render(ctx.req, ctx.res, '/');
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
		.use(registerRouter())
		.use(router.routes())
		.listen(port, () => {
			logger.info(`Server is running at ${protocol}://${host}:${port}`);
			spinner.succeed(chalk.green(`Server is running at ${protocol}://${host}:${port}`));
		});
});

process.on('unhandledRejection', err => {
	throw err;
});

module.exports = app;
