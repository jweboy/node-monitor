/* eslint-disable */
module.exports = {
	presets: ["next/babel"],
	plugins: [
		[
            "import",
            {
                libraryName: 'antd',
                style: 'css'
            }
        ],
	],
};