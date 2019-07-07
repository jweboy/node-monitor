const autoprefixer =  require('autoprefixer');

module.exports = ({ file, options, env }) => {
	return {
		plugins: [
			autoprefixer({
				env, // 针对.browserslistrc的环境变量
			})
		]
	};
};