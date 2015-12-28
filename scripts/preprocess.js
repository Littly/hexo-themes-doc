var browserify = require('browserify'),
	path = require('path'),
	fs = require('fs');

var b = browserify(),
	inStream,
	writeStream,
	root;

root = process.cwd();

b.add(path.join(root, 'themes/doc/source/_js/main.js'));

hexo.theme.process().then(function () {
	hexo.theme.addProcessor('source/_js/*path', function (file) {
		inStream = b.bundle();
		writeStream = fs.createWriteStream(path.join(root, 'themes/doc/source/js/bundle.js'));
		inStream.pipe(writeStream);
	});
});