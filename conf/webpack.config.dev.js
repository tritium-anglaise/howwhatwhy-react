const 	path = require('path'),
		webpack = require('webpack');

module.exports = {
	entry: '/Users/jimmy/src/howwhatwhy-react/src/index.js',
	output: {
		filename: './howwhatwhy.js',
	},
	module: {
		rules: [
			{
				test: /\.js/,
				use: 'babel-loader'
			}
		]
	},
	plugins: [new webpack.HotModuleReplacementPlugin()]
};