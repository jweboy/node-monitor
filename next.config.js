const withLess = require('@zeit/next-less');
const Dotenv = require('dotenv-webpack');
const path = require('path');

if(typeof require !== 'undefined') {
	require.extensions['.less'] = () => {};
}

module.exports = withLess({
	lessLoaderOptions: {
		javascriptEnabled: true,
	},
	webpack(config) {
		config.plugins = config.plugins || [];

		config.plugins = [
			...config.plugins,

			// read .env file
			new Dotenv({
				path: path.join(__dirname, '.env'),
				// systemvars: true,
			})
		];

		return config;
	}
});
