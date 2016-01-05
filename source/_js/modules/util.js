/*通用工具*/
module.exports = {
	randomStr: function (len) {
		/*随机字符串生成*/
		var tmp = [],
			n;
		while (len--) {
			n = ~~(26 * Math.random());
			tmp.push(n > 9 ? String.fromCharCode(n + 87) : n);
		}
		return tmp.join('');
	},
	saveFlow: function (func, to) {
		/*函数节流*/
		var lock = false;
		return function () {
			if (!lock) {
				lock = true, func.apply(null, arguments);
				setTimeout(function () {
					lock = false;
				}, to);
			}
		}
	},
	//	getScrollTop: (function () {
	//		/*获取滚动高度*/
	//		return Function('scrollY' in window ? 'return window.scrollY' : 'return document.documentElement.scrollTop');
	//	})(),
	forEach: function (a) {
		return [].forEach.apply(a, Array.prototype.slice.call(arguments, 1));
	},
	data: (function () {
		/*data属性*/
		return document.body.dataset ? function (el, key, val) {
			if (val) {
				el.dataset[key] = val;
				return;
			}
			return el.dataset[key];
		} : function (el, key, val) {
			if (val) {
				el.setAttribute('data-' + key, val);
				return;
			}
			el.getAttribute('data-' + key);
		};
	})(),
	hasClass: function (el, _className) {
		return new RegExp('\\b' + _className + '\\b').test(el.className);
	},
	addClass: (function () {
		/*添加类*/
		return 'classList' in document.body ? function (el, _className) {
			el.classList.add(_className);
		} : function (el, _className) {
			var len,
				_t = el.className.split(' ');
			len = _t.length;
			while (len--) {
				if (_t[len].trim() === '') {
					_t.splice(len, 1);
				}
			}
			_t.push(_className);
			el.className = _t.join(' ');
		};
	})(),
	removeClass: (function () {
		/*移除类*/
		return 'classList' in document.body ? function (el, _className) {
			el.classList.remove(_className);
		} : function (el, _className) {
			var len,
				_t = el.className.split(' ');
			len = _t.length;
			while (len--) {
				if (_t[len].trim() === '' || _t[len].trim() === _className) {
					_t.splice(len, 1);
				}
			}
			el.className = _t.join(' ');
		};
	})(),
	appendScript: function (src, onload) {
		var script = document.createElement('script');
		script.src = src;
		script.onload = onload;
		document.body.appendChild(script);
	}
};
