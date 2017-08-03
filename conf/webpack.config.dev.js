const 	path = require('path'),
		process = require('process'),
		webpack = require('webpack');

module.exports = {
	entry: path.join(process.cwd(), 'src', 'index.js'),
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