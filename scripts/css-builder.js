const fs = require('fs'),
	sass = require('node-sass');

module.exports = {
	build: () => {
		const output = sass.renderSync({
			file: './src/scss/index.scss',
			outputStyle: 'compressed',
			sourceMap: false
		});

		fs.writeFileSync(
			'./assets/css/main.css',
			output.css.toString('utf8')
		);
	}
};