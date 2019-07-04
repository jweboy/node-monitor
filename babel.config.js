/* eslint-disable */
module.exports = {
	presets: ["next/babel"],
	plugins: [
		[
            "import",
            {
                libraryName: 'antd',
                style: true
            },
        ],
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
	],
};
