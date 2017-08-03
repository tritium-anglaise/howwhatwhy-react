/*
	 Uploads the contents of the dist/ directory to S3.
 */

const AWS = require( 'aws-sdk' ),
	fs = require( 'fs' ),
	path = require('path'),
	zlib = require('zlib'),
	extensionMimeMap = {
		'.css': {mimeType: 'text/css', binary: false},
		'.gif': {mimeType: 'image/gif', binary: true},
		'.html': {mimeType: 'text/html', binary: false},
        '.ico': {mimeType: 'image/ico', binary: true},
		'.js': {mimeType: 'text/javascript', binary: false},
        '.jpg': {mimeType: 'image/jpg', binary: true},
        '.png': {mimeType: 'image/png', binary: true},
		'.woff': {mimeType: 'application/font-woff', binary: true}
	},
	s3 = new AWS.S3( {region: 'us-west-2'} ),
	uploadFile = function( file ) {
		let params = {
				Bucket: 'howwhatwhy.france-chance.com',
				Key: file
			},
			_absPath = path.resolve('dist', file),
			_parsedName = path.parse(file),
			_extension = _parsedName.ext,
			_mimeData = extensionMimeMap[_extension];

		if (_mimeData !== undefined) {
			if (_mimeData.binary){
                params.Body = fs.readFileSync(_absPath);
			} else {
                params.Body = fs.readFileSync(_absPath, 'utf8');
			}
			params.ContentType = _mimeData.mimeType;
		} else if (_parsedName.ext === '.gz') {
			// serving a gzip'd asset from s3 requires us to upload it without the
			// extension. we need to specify it as compressed via ContentEncoding.
			// also, don't prefix root-level assets with a leading '/' (eg, /index.html),
			// otherwise s3 will create an untitled directory and store the file there.
			params.Key = _parsedName.dir === '' ? _parsedName.name : _parsedName.dir + '/' + _parsedName.name;
			params.Body = fs.readFileSync(_absPath);
			// get the extension for the file prior to adding .gz
			params.ContentType = 'text/' + extensionMimeMap[path.parse(_parsedName.name).ext];
			params.ContentEncoding = 'gzip';
		}

		s3.putObject(params, function (error) {
			if (error) {
				console.log(error);
			} else {
				console.log('Uploaded ' + file);
			}
		})
	};

function walkDistFiles(fileName) {
	let _path = path.resolve('dist', fileName);

	if( fs.statSync(_path).isDirectory() ) {
		fs.readdirSync( path.resolve(_path) ).map(function(subdir) {
			walkDistFiles(fileName + '/' + subdir);
		});
	} else {
		uploadFile(fileName);
	}
}

fs.readdirSync(path.resolve('dist')).map(walkDistFiles);