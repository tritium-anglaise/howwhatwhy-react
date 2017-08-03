const fs = require('fs'),
	path = require('path'),
	process = require('process'),
    sass = require('node-sass');

module.exports = {
	build: () => {
		const output = sass.renderSync({
			file: path.join( process.cwd(), 'src', 'scss', 'index.scss'),
			outputStyle: 'compressed',
			sourceMap: false
		});

		if( fs.existsSync('./assets/css') === false ){
		    fs.mkdirSync('./assets/css')
		}

		fs.writeFileSync(
			'./assets/css/main.css',
			output.css.toString('utf8')
		);
	}
};