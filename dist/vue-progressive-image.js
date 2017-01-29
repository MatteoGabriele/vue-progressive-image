(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__(1);\n\n\n//////////////////\n// WEBPACK FOOTER\n// multi main\n// module id = 0\n// module chunks = 0\n//# sourceURL=webpack:///multi_main?");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';Object.defineProperty(exports, \"__esModule\", { value: true });var _progressiveImg = __webpack_require__(2);var _progressiveImg2 = _interopRequireDefault(_progressiveImg);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}\n\nvar install = function install(Vue) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n  var component = (0, _progressiveImg2.default)(Vue, options);\n\n\n\n\n  Vue.component('progressive-img', component);\n  Vue.component('progressive-image', component);\n};exports.default =\n\n{\n  install: install };\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/index.js\n// module id = 1\n// module chunks = 0\n//# sourceURL=webpack:///./src/index.js?");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';Object.defineProperty(exports, \"__esModule\", { value: true });exports.default =\n\n\nfunction (Vue, options) {\n  return {\n    name: 'progressive-img',\n\n    template: _progressiveImg2.default,\n\n    props: {\n      src: {\n        type: String,\n        required: true },\n\n      placeholder: {\n        type: String,\n        required: false },\n\n      blur: {\n        type: Number,\n        required: false },\n\n      alt: {\n        type: String,\n        required: false } },\n\n\n\n    data: function data() {\n      return {\n        options: options,\n        style: _progressiveImg4.default,\n        defaultBlur: 5,\n        image: null,\n        placeholderImage: null,\n        aspectRatio: 56.25 };\n\n    },\n\n    computed: {\n      shouldPlaceholderRender: function shouldPlaceholderRender() {\n        return this.placeholderImage;\n      },\n\n      shouldImageRender: function shouldImageRender() {\n        return this.image;\n      },\n\n      wrapperStyle: function wrapperStyle() {\n        return {\n          paddingBottom: this.aspectRatio + '%' };\n\n      },\n\n      placeholderStyle: function placeholderStyle() {\n        var blur = this.blur || this.options.blur || this.defaultBlur;\n\n        if (blur === 0) {\n          return {};\n        }\n\n        return {\n          filter: 'blur(' + blur + 'px)' };\n\n      } },\n\n\n    created: function created() {\n      this.handleImageLoading();\n    },\n\n    methods: {\n      defineAspectRatio: function defineAspectRatio(img) {var _this = this;\n        var interval = setInterval(function () {\n          if (!img.naturalWidth) {\n            return;\n          }\n\n          clearInterval(interval);var\n\n          naturalHeight = img.naturalHeight,naturalWidth = img.naturalWidth;\n\n          _this.aspectRatio = naturalHeight / naturalWidth * 100;\n        }, 100);\n      },\n\n      loadImage: function loadImage() {var _this2 = this;\n        var image = new Image();\n\n        this.defineAspectRatio(image);\n\n        image.onload = function () {\n          setTimeout(function () {\n            _this2.image = _this2.src;\n          }, _this2.options.delay || 0);\n        };\n\n        image.src = this.src;\n      },\n\n      loadPlaceholder: function loadPlaceholder() {var _this3 = this;\n        if (!this.placeholder && !this.options.placeholder) {\n          return;\n        }\n\n        var image = new Image();\n        var src = this.placeholder;\n\n\n\n\n\n\n\n        if (this.options.placeholder && !this.placeholder) {\n          src = this.options.placeholder;\n        }\n\n        image.onload = function () {\n          _this3.placeholderImage = src;\n        };\n\n        image.src = src;\n      },\n\n      handleImageLoading: function handleImageLoading() {\n        this.loadPlaceholder();\n        this.loadImage();\n      } } };\n\n\n};var _progressiveImg = __webpack_require__(3);var _progressiveImg2 = _interopRequireDefault(_progressiveImg);var _progressiveImg3 = __webpack_require__(4);var _progressiveImg4 = _interopRequireDefault(_progressiveImg3);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/component/progressive-img.js\n// module id = 2\n// module chunks = 0\n//# sourceURL=webpack:///./src/component/progressive-img.js?");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("module.exports = \"<div :class=\\\"style.component\\\">\\n  <div :style=\\\"wrapperStyle\\\">\\n    <transition\\n      :enter-class=\\\"style.enter\\\"\\n      :enter-active-class=\\\"style.before\\\">\\n      <img\\n        v-if=\\\"shouldImageRender\\\"\\n        :class=\\\"style.image\\\"\\n        :src=\\\"image\\\"\\n        :alt=\\\"alt\\\"\\n      />\\n    </transition>\\n    <img\\n      v-if=\\\"shouldPlaceholderRender\\\"\\n      :class=\\\"style.placeholder\\\"\\n      :style=\\\"placeholderStyle\\\"\\n      :src=\\\"placeholderImage\\\"\\n    />\\n  </div>\\n</div>\\n\";\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/component/progressive-img.html\n// module id = 3\n// module chunks = 0\n//# sourceURL=webpack:///./src/component/progressive-img.html?");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(5);\nif(typeof content === 'string') content = [[module.id, content, '']];\n// add the styles to the DOM\nvar update = __webpack_require__(7)(content, {});\nif(content.locals) module.exports = content.locals;\n// Hot Module Replacement\nif(false) {\n\t// When the styles change, update the <style> tags\n\tif(!content.locals) {\n\t\tmodule.hot.accept(\"!!./../../node_modules/css-loader/index.js?modules=true&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!./../../node_modules/postcss-loader/index.js!./progressive-img.css\", function() {\n\t\t\tvar newContent = require(\"!!./../../node_modules/css-loader/index.js?modules=true&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!./../../node_modules/postcss-loader/index.js!./progressive-img.css\");\n\t\t\tif(typeof newContent === 'string') newContent = [[module.id, newContent, '']];\n\t\t\tupdate(newContent);\n\t\t});\n\t}\n\t// When the module is disposed, remove the <style> tags\n\tmodule.hot.dispose(function() { update(); });\n}\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/component/progressive-img.css\n// module id = 4\n// module chunks = 0\n//# sourceURL=webpack:///./src/component/progressive-img.css?");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	eval("exports = module.exports = __webpack_require__(6)();\n// imports\n\n\n// module\nexports.push([module.id, \".progressive-img__component___3IPlO {\\n  position: relative;\\n  overflow: hidden;\\n}\\n\\n.progressive-img__image___Q7uio {\\n  position: absolute;\\n  top: 0;\\n  left: 0;\\n  width: 100%;\\n  z-index: 1;\\n  -webkit-transition: opacity 1s;\\n  transition: opacity 1s;\\n  -webkit-backface-visibility: hidden;\\n          backface-visibility: hidden;\\n}\\n\\n.progressive-img__before___3bh7h {\\n  opacity: 1;\\n}\\n\\n.progressive-img__enter___1NGth {\\n  opacity: 0;\\n}\\n\\n.progressive-img__placeholder___YUzbp {\\n  z-index: 0;\\n\\n  /* this is needed so Safari keeps sharp edges */\\n  -webkit-transform: scale(1);\\n          transform: scale(1)\\n}\\n\", \"\"]);\n\n// exports\nexports.locals = {\n\t\"component\": \"progressive-img__component___3IPlO\",\n\t\"image\": \"progressive-img__image___Q7uio\",\n\t\"before\": \"progressive-img__before___3bh7h\",\n\t\"enter\": \"progressive-img__enter___1NGth\",\n\t\"placeholder\": \"progressive-img__placeholder___YUzbp progressive-img__image___Q7uio\"\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./~/css-loader?modules=true&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!./~/postcss-loader!./src/component/progressive-img.css\n// module id = 5\n// module chunks = 0\n//# sourceURL=webpack:///./src/component/progressive-img.css?./~/css-loader?modules=true&importLoaders=1&localIdentName=%5Bname%5D__%5Blocal%5D___%5Bhash:base64:5%5D!./~/postcss-loader");

/***/ },
/* 6 */
/***/ function(module, exports) {

	eval("/*\r\n\tMIT License http://www.opensource.org/licenses/mit-license.php\r\n\tAuthor Tobias Koppers @sokra\r\n*/\r\n// css base code, injected by the css-loader\r\nmodule.exports = function() {\r\n\tvar list = [];\r\n\r\n\t// return the list of modules as css string\r\n\tlist.toString = function toString() {\r\n\t\tvar result = [];\r\n\t\tfor(var i = 0; i < this.length; i++) {\r\n\t\t\tvar item = this[i];\r\n\t\t\tif(item[2]) {\r\n\t\t\t\tresult.push(\"@media \" + item[2] + \"{\" + item[1] + \"}\");\r\n\t\t\t} else {\r\n\t\t\t\tresult.push(item[1]);\r\n\t\t\t}\r\n\t\t}\r\n\t\treturn result.join(\"\");\r\n\t};\r\n\r\n\t// import a list of modules into the list\r\n\tlist.i = function(modules, mediaQuery) {\r\n\t\tif(typeof modules === \"string\")\r\n\t\t\tmodules = [[null, modules, \"\"]];\r\n\t\tvar alreadyImportedModules = {};\r\n\t\tfor(var i = 0; i < this.length; i++) {\r\n\t\t\tvar id = this[i][0];\r\n\t\t\tif(typeof id === \"number\")\r\n\t\t\t\talreadyImportedModules[id] = true;\r\n\t\t}\r\n\t\tfor(i = 0; i < modules.length; i++) {\r\n\t\t\tvar item = modules[i];\r\n\t\t\t// skip already imported module\r\n\t\t\t// this implementation is not 100% perfect for weird media query combinations\r\n\t\t\t//  when a module is imported multiple times with different media queries.\r\n\t\t\t//  I hope this will never occur (Hey this way we have smaller bundles)\r\n\t\t\tif(typeof item[0] !== \"number\" || !alreadyImportedModules[item[0]]) {\r\n\t\t\t\tif(mediaQuery && !item[2]) {\r\n\t\t\t\t\titem[2] = mediaQuery;\r\n\t\t\t\t} else if(mediaQuery) {\r\n\t\t\t\t\titem[2] = \"(\" + item[2] + \") and (\" + mediaQuery + \")\";\r\n\t\t\t\t}\r\n\t\t\t\tlist.push(item);\r\n\t\t\t}\r\n\t\t}\r\n\t};\r\n\treturn list;\r\n};\r\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./~/css-loader/lib/css-base.js\n// module id = 6\n// module chunks = 0\n//# sourceURL=webpack:///./~/css-loader/lib/css-base.js?");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	eval("/*\r\n\tMIT License http://www.opensource.org/licenses/mit-license.php\r\n\tAuthor Tobias Koppers @sokra\r\n*/\r\nvar stylesInDom = {},\r\n\tmemoize = function(fn) {\r\n\t\tvar memo;\r\n\t\treturn function () {\r\n\t\t\tif (typeof memo === \"undefined\") memo = fn.apply(this, arguments);\r\n\t\t\treturn memo;\r\n\t\t};\r\n\t},\r\n\tisOldIE = memoize(function() {\r\n\t\treturn /msie [6-9]\\b/.test(window.navigator.userAgent.toLowerCase());\r\n\t}),\r\n\tgetHeadElement = memoize(function () {\r\n\t\treturn document.head || document.getElementsByTagName(\"head\")[0];\r\n\t}),\r\n\tsingletonElement = null,\r\n\tsingletonCounter = 0,\r\n\tstyleElementsInsertedAtTop = [];\r\n\r\nmodule.exports = function(list, options) {\r\n\tif(false) {\r\n\t\tif(typeof document !== \"object\") throw new Error(\"The style-loader cannot be used in a non-browser environment\");\r\n\t}\r\n\r\n\toptions = options || {};\r\n\t// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\r\n\t// tags it will allow on a page\r\n\tif (typeof options.singleton === \"undefined\") options.singleton = isOldIE();\r\n\r\n\t// By default, add <style> tags to the bottom of <head>.\r\n\tif (typeof options.insertAt === \"undefined\") options.insertAt = \"bottom\";\r\n\r\n\tvar styles = listToStyles(list);\r\n\taddStylesToDom(styles, options);\r\n\r\n\treturn function update(newList) {\r\n\t\tvar mayRemove = [];\r\n\t\tfor(var i = 0; i < styles.length; i++) {\r\n\t\t\tvar item = styles[i];\r\n\t\t\tvar domStyle = stylesInDom[item.id];\r\n\t\t\tdomStyle.refs--;\r\n\t\t\tmayRemove.push(domStyle);\r\n\t\t}\r\n\t\tif(newList) {\r\n\t\t\tvar newStyles = listToStyles(newList);\r\n\t\t\taddStylesToDom(newStyles, options);\r\n\t\t}\r\n\t\tfor(var i = 0; i < mayRemove.length; i++) {\r\n\t\t\tvar domStyle = mayRemove[i];\r\n\t\t\tif(domStyle.refs === 0) {\r\n\t\t\t\tfor(var j = 0; j < domStyle.parts.length; j++)\r\n\t\t\t\t\tdomStyle.parts[j]();\r\n\t\t\t\tdelete stylesInDom[domStyle.id];\r\n\t\t\t}\r\n\t\t}\r\n\t};\r\n}\r\n\r\nfunction addStylesToDom(styles, options) {\r\n\tfor(var i = 0; i < styles.length; i++) {\r\n\t\tvar item = styles[i];\r\n\t\tvar domStyle = stylesInDom[item.id];\r\n\t\tif(domStyle) {\r\n\t\t\tdomStyle.refs++;\r\n\t\t\tfor(var j = 0; j < domStyle.parts.length; j++) {\r\n\t\t\t\tdomStyle.parts[j](item.parts[j]);\r\n\t\t\t}\r\n\t\t\tfor(; j < item.parts.length; j++) {\r\n\t\t\t\tdomStyle.parts.push(addStyle(item.parts[j], options));\r\n\t\t\t}\r\n\t\t} else {\r\n\t\t\tvar parts = [];\r\n\t\t\tfor(var j = 0; j < item.parts.length; j++) {\r\n\t\t\t\tparts.push(addStyle(item.parts[j], options));\r\n\t\t\t}\r\n\t\t\tstylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};\r\n\t\t}\r\n\t}\r\n}\r\n\r\nfunction listToStyles(list) {\r\n\tvar styles = [];\r\n\tvar newStyles = {};\r\n\tfor(var i = 0; i < list.length; i++) {\r\n\t\tvar item = list[i];\r\n\t\tvar id = item[0];\r\n\t\tvar css = item[1];\r\n\t\tvar media = item[2];\r\n\t\tvar sourceMap = item[3];\r\n\t\tvar part = {css: css, media: media, sourceMap: sourceMap};\r\n\t\tif(!newStyles[id])\r\n\t\t\tstyles.push(newStyles[id] = {id: id, parts: [part]});\r\n\t\telse\r\n\t\t\tnewStyles[id].parts.push(part);\r\n\t}\r\n\treturn styles;\r\n}\r\n\r\nfunction insertStyleElement(options, styleElement) {\r\n\tvar head = getHeadElement();\r\n\tvar lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];\r\n\tif (options.insertAt === \"top\") {\r\n\t\tif(!lastStyleElementInsertedAtTop) {\r\n\t\t\thead.insertBefore(styleElement, head.firstChild);\r\n\t\t} else if(lastStyleElementInsertedAtTop.nextSibling) {\r\n\t\t\thead.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);\r\n\t\t} else {\r\n\t\t\thead.appendChild(styleElement);\r\n\t\t}\r\n\t\tstyleElementsInsertedAtTop.push(styleElement);\r\n\t} else if (options.insertAt === \"bottom\") {\r\n\t\thead.appendChild(styleElement);\r\n\t} else {\r\n\t\tthrow new Error(\"Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.\");\r\n\t}\r\n}\r\n\r\nfunction removeStyleElement(styleElement) {\r\n\tstyleElement.parentNode.removeChild(styleElement);\r\n\tvar idx = styleElementsInsertedAtTop.indexOf(styleElement);\r\n\tif(idx >= 0) {\r\n\t\tstyleElementsInsertedAtTop.splice(idx, 1);\r\n\t}\r\n}\r\n\r\nfunction createStyleElement(options) {\r\n\tvar styleElement = document.createElement(\"style\");\r\n\tstyleElement.type = \"text/css\";\r\n\tinsertStyleElement(options, styleElement);\r\n\treturn styleElement;\r\n}\r\n\r\nfunction createLinkElement(options) {\r\n\tvar linkElement = document.createElement(\"link\");\r\n\tlinkElement.rel = \"stylesheet\";\r\n\tinsertStyleElement(options, linkElement);\r\n\treturn linkElement;\r\n}\r\n\r\nfunction addStyle(obj, options) {\r\n\tvar styleElement, update, remove;\r\n\r\n\tif (options.singleton) {\r\n\t\tvar styleIndex = singletonCounter++;\r\n\t\tstyleElement = singletonElement || (singletonElement = createStyleElement(options));\r\n\t\tupdate = applyToSingletonTag.bind(null, styleElement, styleIndex, false);\r\n\t\tremove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);\r\n\t} else if(obj.sourceMap &&\r\n\t\ttypeof URL === \"function\" &&\r\n\t\ttypeof URL.createObjectURL === \"function\" &&\r\n\t\ttypeof URL.revokeObjectURL === \"function\" &&\r\n\t\ttypeof Blob === \"function\" &&\r\n\t\ttypeof btoa === \"function\") {\r\n\t\tstyleElement = createLinkElement(options);\r\n\t\tupdate = updateLink.bind(null, styleElement);\r\n\t\tremove = function() {\r\n\t\t\tremoveStyleElement(styleElement);\r\n\t\t\tif(styleElement.href)\r\n\t\t\t\tURL.revokeObjectURL(styleElement.href);\r\n\t\t};\r\n\t} else {\r\n\t\tstyleElement = createStyleElement(options);\r\n\t\tupdate = applyToTag.bind(null, styleElement);\r\n\t\tremove = function() {\r\n\t\t\tremoveStyleElement(styleElement);\r\n\t\t};\r\n\t}\r\n\r\n\tupdate(obj);\r\n\r\n\treturn function updateStyle(newObj) {\r\n\t\tif(newObj) {\r\n\t\t\tif(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)\r\n\t\t\t\treturn;\r\n\t\t\tupdate(obj = newObj);\r\n\t\t} else {\r\n\t\t\tremove();\r\n\t\t}\r\n\t};\r\n}\r\n\r\nvar replaceText = (function () {\r\n\tvar textStore = [];\r\n\r\n\treturn function (index, replacement) {\r\n\t\ttextStore[index] = replacement;\r\n\t\treturn textStore.filter(Boolean).join('\\n');\r\n\t};\r\n})();\r\n\r\nfunction applyToSingletonTag(styleElement, index, remove, obj) {\r\n\tvar css = remove ? \"\" : obj.css;\r\n\r\n\tif (styleElement.styleSheet) {\r\n\t\tstyleElement.styleSheet.cssText = replaceText(index, css);\r\n\t} else {\r\n\t\tvar cssNode = document.createTextNode(css);\r\n\t\tvar childNodes = styleElement.childNodes;\r\n\t\tif (childNodes[index]) styleElement.removeChild(childNodes[index]);\r\n\t\tif (childNodes.length) {\r\n\t\t\tstyleElement.insertBefore(cssNode, childNodes[index]);\r\n\t\t} else {\r\n\t\t\tstyleElement.appendChild(cssNode);\r\n\t\t}\r\n\t}\r\n}\r\n\r\nfunction applyToTag(styleElement, obj) {\r\n\tvar css = obj.css;\r\n\tvar media = obj.media;\r\n\r\n\tif(media) {\r\n\t\tstyleElement.setAttribute(\"media\", media)\r\n\t}\r\n\r\n\tif(styleElement.styleSheet) {\r\n\t\tstyleElement.styleSheet.cssText = css;\r\n\t} else {\r\n\t\twhile(styleElement.firstChild) {\r\n\t\t\tstyleElement.removeChild(styleElement.firstChild);\r\n\t\t}\r\n\t\tstyleElement.appendChild(document.createTextNode(css));\r\n\t}\r\n}\r\n\r\nfunction updateLink(linkElement, obj) {\r\n\tvar css = obj.css;\r\n\tvar sourceMap = obj.sourceMap;\r\n\r\n\tif(sourceMap) {\r\n\t\t// http://stackoverflow.com/a/26603875\r\n\t\tcss += \"\\n/*# sourceMappingURL=data:application/json;base64,\" + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + \" */\";\r\n\t}\r\n\r\n\tvar blob = new Blob([css], { type: \"text/css\" });\r\n\r\n\tvar oldSrc = linkElement.href;\r\n\r\n\tlinkElement.href = URL.createObjectURL(blob);\r\n\r\n\tif(oldSrc)\r\n\t\tURL.revokeObjectURL(oldSrc);\r\n}\r\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./~/style-loader/addStyles.js\n// module id = 7\n// module chunks = 0\n//# sourceURL=webpack:///./~/style-loader/addStyles.js?");

/***/ }
/******/ ])
});
;