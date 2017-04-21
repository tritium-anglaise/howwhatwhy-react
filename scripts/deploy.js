/*
	 Uploads the contents of the dist/ directory to S3.
 */

const AWS = require( 'aws-sdk' ),
	fs = require( 'fs' ),
	path = require('path'),
	zlib = require('zlib'),
	imageExtensions = ['.gif', '.ico', '.jpg', '.png'],
	extensionMimeMap = {'.css': 'css', '.html': 'html', '.js': 'javascript'},
	s3 = new AWS.S3( {region: 'us-west-2'} ),
	uploadFile = function( file ) {
		let params = {
				Bucket: 'howwhatwhy.france-chance.com',
				Key: file
			},
			_absPath = path.resolve('dist', file),
			_parsedName = path.parse(file),
			_extension = _parsedName.ext;

		if (imageExtensions.includes(_extension)) {
			params.Body = fs.readFileSync(_absPath);
			params.ContentType = 'image/' + _extension;
		} else if (_parsedName.ext === '.gz') {
			// serving a gzip'd asset from s3 requires us to upload it without the
			// extension, and specify it as compressed via ContentEncoding
			params.Key = _parsedName.dir + '/' + _parsedName.name;
			params.Body = fs.readFileSync(_absPath);
			// get the extension for the file prior to adding .gz
			params.ContentType = 'text/' + extensionMimeMap[path.parse(_parsedName.name).ext];
			params.ContentEncoding = 'gzip';
		} else if (_parsedName.ext === '.woff') {
			params.Body = fs.readFileSync(_absPath);
			params.ContentType = 'application/font-woff';
		} else {
			params.Body = fs.readFileSync(_absPath, 'utf8');
			params.ContentType = 'text/' + _extension;
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