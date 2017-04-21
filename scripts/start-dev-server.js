const fs = require('fs'),
	cssBuilder = require('./css-builder.js'),
	devConfig = require('../conf/webpack.config.dev.js'),
	DevServer = require('webpack-dev-server'),
	webpack = require('webpack'),
	// starts the dev server
	server = new DevServer(webpack(devConfig), {hot: true});

server.listen(8000);

// watch the file system for any change to a file in the scss directory
fs.watch('./src/scss', cssBuilder.build);