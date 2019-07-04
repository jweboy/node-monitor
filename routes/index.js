const compose = require('koa-compose');
const glob = require('glob');
const path = require('path');

const registerRouter = () => {
	const files = path.resolve(__dirname, '*.js');
	const routers = [];

	glob.sync(files)
		.filter((item) => item.indexOf('index.js') === -1)
		.forEach((route) => {
			routers.push(require(route).routes());
		});

	return compose(routers);
};

// registerRouter();
module.exports = registerRouter;
