const 	cssBuilder = require('./css-builder.js'),
		devConfig = require('../conf/webpack.config.dev.js'),
		devServer = require('webpack-dev-server'),
    	fs = require('fs'),
		path = require('path'),
		process = require('process'),
		webpack = require('webpack'),
		// starts the dev server
		server = new devServer(webpack(devConfig), {
			contentBase: [path.resolve(), path.resolve("assets")],
			hot: true
		});

server.listen(8000);

// watch the file system for any change to a file in the scss directory
fs.watch( path.join( process.cwd(), 'src', 'scss' ), cssBuilder.build );