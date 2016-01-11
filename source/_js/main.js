/*特有代码*/
if (/^api/.test(hexo.path)) {
	var API = require('./modules/api.js');
	API.init();
}
else {
	var IDX = require('./modules/idx.js');
	IDX.init();
	IDX.start();
}