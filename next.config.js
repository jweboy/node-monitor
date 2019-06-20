const withCss = require('@zeit/next-css');
const Dotenv = require('dotenv-webpack');
const path = require('path');

if(typeof require !== 'undefined') {
	require.extensions['.css'] = () => {};
}

module.exports = withCss({
	webpack: config => {
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
