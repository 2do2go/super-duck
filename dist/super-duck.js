(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("redux"));
	else if(typeof define === 'function' && define.amd)
		define(["redux"], factory);
	else if(typeof exports === 'object')
		exports["superDuck"] = factory(require("redux"));
	else
		root["superDuck"] = factory(root["redux"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_6__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__extendDuck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(2);



// create composed selector from path to get values from deep nested objects
var createDeepSelector = function createDeepSelector(path) {
	var selectors = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["h" /* splitPath */])(path).reverse().map(function (key) {
		return function (state) {
			return state[key];
		};
	});
	return Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* compose */])(selectors);
};

var createDuck = function createDuck() {
	var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var path = options.path;


	if (!path) {
		throw new Error('"path" option is required');
	}

	var _options$key = options.key,
	    key = _options$key === undefined ? Object(__WEBPACK_IMPORTED_MODULE_1__utils__["g" /* last */])(Object(__WEBPACK_IMPORTED_MODULE_1__utils__["h" /* splitPath */])(path)) : _options$key,
	    _options$rootSelector = options.rootSelector,
	    rootSelector = _options$rootSelector === undefined ? createDeepSelector(path) : _options$rootSelector;


	return Object(__WEBPACK_IMPORTED_MODULE_0__extendDuck__["a" /* default */])({
		path: path,
		key: key,
		rootSelector: rootSelector,
		types: {},
		selectors: {},
		actions: {},
		operations: {},
		initialState: undefined,
		reducer: __WEBPACK_IMPORTED_MODULE_1__utils__["c" /* identity */]
	}, options);
};

/* harmony default export */ __webpack_exports__["a"] = (createDuck);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(2);


// convert 'camelCase' to 'CAMEL_CASE'
var camelCaseRegExp = /([a-z\d])([A-Z]+)/g;
var normalizeTypeName = function normalizeTypeName(type) {
	return type.trim().replace(camelCaseRegExp, '$1_$2').toUpperCase();
};

// normalize type and join with path
var buildType = function buildType(path, type) {
	return Object(__WEBPACK_IMPORTED_MODULE_0__utils__["f" /* joinPath */])([path, normalizeTypeName(type)]);
};

// convert types array to name-type map
var buildTypesMap = function buildTypesMap(path, types) {
	return Object(__WEBPACK_IMPORTED_MODULE_0__utils__["i" /* zip */])(types, types.map(function (type) {
		return buildType(path, type);
	}));
};

// create new object with proto and additional props
var getExtendedObject = function getExtendedObject(proto, props) {
	return Object.assign(Object.create(proto), props);
};

var requiredProps = ['path', 'key', 'rootSelector'];

var extendDuck = function extendDuck() {
	var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var extension = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	requiredProps.forEach(function (prop) {
		if (!parent[prop]) {
			throw new Error('Parent duck should have a "' + prop + '" property');
		}
	});

	if (!Object(__WEBPACK_IMPORTED_MODULE_0__utils__["e" /* isObject */])(extension)) {
		throw new Error('Extension should be an object');
	}

	// create new duck and
	// save parent duck to access parent properties
	var duck = {
		super: parent,
		path: parent.path,
		key: parent.key,
		rootSelector: parent.rootSelector
	};

	var getExtensionValue = function getExtensionValue(key, fallback) {
		var value = extension[key] || fallback;
		if (Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* isFunction */])(value)) {
			return value(duck, extension);
		}
		return value;
	};

	// create types map with inheritance
	// types could be already mapped
	var types = getExtensionValue('types', []);
	if (Array.isArray(types)) {
		types = buildTypesMap(parent.path, types);
	}
	duck.types = getExtendedObject(parent.types, types);

	// create actions map with inheritance
	var selectors = getExtensionValue('selectors', {});
	duck.selectors = getExtendedObject(parent.selectors, selectors);

	// create actions map with inheritance
	var actions = getExtensionValue('actions', {});
	duck.actions = getExtendedObject(parent.actions, actions);

	// create operations map with inheritance
	var operations = getExtensionValue('operations', {});
	duck.operations = getExtendedObject(parent.operations, operations);

	// override initialState only if defined
	if (Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* has */])(extension, 'initialState')) {
		duck.initialState = getExtensionValue('initialState');
	} else {
		duck.initialState = parent.initialState;
	}

	// get reducer from "reducer" property or create new reducer with "createReducer"
	var reducer = void 0;
	if (Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* has */])(extension, 'reducer')) {
		reducer = extension.reducer;
	} else if (Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* has */])(extension, 'createReducer')) {
		reducer = extension.createReducer(duck, extension);
	} else {
		reducer = parent.reducer;
	}
	duck.reducer = function () {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : duck.initialState;
		var action = arguments[1];
		return reducer(state, action);
	};

	return duck;
};

/* harmony default export */ __webpack_exports__["a"] = (extendDuck);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return last; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return has; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return isFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return zip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return joinPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return splitPath; });
/* unused harmony export slice */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return compose; });
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var pathDelimiter = '/';

// return last item from array
var last = function last(array) {
	return array[array.length - 1];
};

// simple identity iterator
var identity = function identity(value) {
	return value;
};

// Object.hasOwnProperty wrapper
var has = function has(obj, key) {
	return obj != null && Object.prototype.hasOwnProperty.call(obj, key);
};

// type checkers
var isObject = function isObject(obj) {
	return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
};
var isFunction = function isFunction(func) {
	return func !== null && typeof func === 'function';
};

// create map from two arrays
var zip = function zip(keys, values) {
	return values.reduce(function (result, value, index) {
		result[keys[index]] = value;
		return result;
	}, {});
};

// convert ['a', 'b', 'c'] to 'a/b/c'
var joinPath = function joinPath(args) {
	return args.filter(identity).join(pathDelimiter);
};

// convert 'a/b/c' to ['a', 'b', 'c']
var splitPath = function splitPath(path) {
	return path.split(pathDelimiter);
};

// Array.slice wrapper
var slice = function slice(array, begin, end) {
	return Array.prototype.slice.call(array, begin, end);
};

// compose functions from args to () => a(b(c()))
var compose = function compose(args) {
	return slice(args).reverse().reduce(function (result, selector) {
		return function (state) {
			return selector(result(state));
		};
	}, identity);
};

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var getDuckReducers = function getDuckReducers(ducks) {
	return ducks.reduce(function (reducers, duck) {
		reducers[duck.key] = duck.reducer;
		return reducers;
	}, {});
};

/* harmony default export */ __webpack_exports__["a"] = (getDuckReducers);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createDuck__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createDuck", function() { return __WEBPACK_IMPORTED_MODULE_0__createDuck__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__extendDuck__ = __webpack_require__(1);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "extendDuck", function() { return __WEBPACK_IMPORTED_MODULE_1__extendDuck__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__createCombinedDuck__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createCombinedDuck", function() { return __WEBPACK_IMPORTED_MODULE_2__createCombinedDuck__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__getDuckReducers__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "getDuckReducers", function() { return __WEBPACK_IMPORTED_MODULE_3__getDuckReducers__["a"]; });





/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__createDuck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__getDuckReducers__ = __webpack_require__(3);





var createCombinedDuck = function createCombinedDuck(options) {
	var path = options.path,
	    ducks = options.ducks;


	return Object(__WEBPACK_IMPORTED_MODULE_1__createDuck__["a" /* default */])({
		path: path,
		reducer: Object(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])(Object(__WEBPACK_IMPORTED_MODULE_2__getDuckReducers__["a" /* default */])(ducks))
	});
};

/* harmony default export */ __webpack_exports__["a"] = (createCombinedDuck);

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=super-duck.js.map