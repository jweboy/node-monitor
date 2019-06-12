const Koa = require('koa');
const next = require('next');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const cors = require('@koa/cors');
const { createReport, reportList, reportDetail } = require('./models/api-report');

const app = next({ dev: true });
const reqHandler = app.getRequestHandler();

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
		console.log(body);

		ctx.body = await createReport(body);
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

	server.use(bodyParser());
	server.use(cors());
	server.use(router.routes());

	// connect database
	mongoose.connect('mongodb://localhost:27017/monitor', {
		useNewUrlParser: true, // 新解析器中发现错误就回退到旧解析器
	}).then(() => {
		console.log('Database connection is successful.');
	}).catch((err) => {
		console.log(`Database connection is failed: ${err.message}`);
		process.exit(1);
	});

	// connect server
	server.listen(4002, () => {
		console.log('Server is running at http://localhost:4002');
	});
});

process.on('unhandledRejection', err => {
	throw err;
});
