const fs = require('fs');

var foo = fs.readdirSync('../assets/');

function getDistPath(assetPath) {
	return '../dist/' + assetPath.substr(10);
}

function copyAssets(list, basePath) {
	list.map((fileName) => {
		var targetFile = basePath + fileName;

		if (fs.statSync(basePath + fileName).isDirectory()) {
			targetFile += '/';

			//create the target directory if it doesn't already exist
			if (!fs.existsSync(getDistPath(targetFile))) {
				fs.mkdirSync(getDistPath(targetFile));
			}

			copyAssets( fs.readdirSync(targetFile), targetFile );
		} else {						 //to					   	  //from
			fs.writeFileSync(getDistPath(targetFile), fs.readFileSync(targetFile));
		}
	});
}

copyAssets(foo, '../assets/');