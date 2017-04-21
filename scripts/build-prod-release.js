const path = require('path'),
	fs = require('fs'),
	config = require(path.resolve('conf/webpack.config.prod.js')),
	webpack = require('webpack'),
	zlib = require('zlib'),
	compressable = ['.css', '.html', '.js'],
	walkAssets = function(subdir) {
		if(subdir === undefined){
			fs.readdirSync(path.resolve('assets')).map(copyAndCompressAsset);
		} else {
			fs.readdirSync(path.resolve('assets', subdir)).map(function(fileName) {
				copyAndCompressAsset(subdir + '/' + fileName)
			});
		}
	},
	copyAndCompressAsset = function(filePath) {
		let _distPath = path.resolve('dist', filePath),
			_path = path.resolve('assets', filePath);

		if( fs.statSync(_path).isDirectory() ) {
			try {
				fs.accessSync(_distPath);
				walkAssets(filePath);
			}
			catch(e) {
				fs.mkdirSync(_distPath);
				walkAssets(filePath);
			}
		} else {
			let _parsedName = path.parse(_path);

			if(compressable.includes(_parsedName.ext)){
				fs.writeFileSync(_distPath + '.gz', zlib.gzipSync(fs.readFileSync(_path)));
			} else {
				fs.writeFileSync(_distPath, fs.readFileSync(_path));
			}
		}
	};

console.log('Processing...');
webpack(config).run((err, stats) => {
	let outFile = path.resolve('dist/howwhatwhy.js');
	// copy and compress index.html
	fs.writeFileSync(path.resolve('dist/index.html.gz'), zlib.gzipSync(fs.readFileSync(path.resolve('index.html'))));
	// compress webpack's output
	fs.writeFileSync(outFile + '.gz', zlib.gzipSync(fs.readFileSync(outFile)));
	// remove the original
	fs.unlinkSync(outFile);
	// copy files from assets and compress as necessary
	walkAssets();

	console.log('Done.');
});