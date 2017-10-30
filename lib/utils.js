const pathDelimiter = '/';

// return last item from array
export const last = array => array[array.length - 1];

// simple identity iterator
export const identity = value => value;

// Object.hasOwnProperty wrapper
export const has = (obj, key) => (obj != null && Object.prototype.hasOwnProperty.call(obj, key));

// type checkers
export const isObject = obj => (obj !== null && typeof obj === 'object');
export const isFunction = func => (func !== null && typeof func === 'function');

// compare two arrays
export const isEqual = (arr1, arr2) => (
	arr1.length === arr2.length &&
	!arr1.find((item, index) => item !== arr2[index])
);

// create map from two arrays
export const zip = (keys, values) => values.reduce((result, value, index) => {
	result[keys[index]] = value;
	return result;
}, {});

// convert ['a', 'b', 'c'] to 'a/b/c'
export const joinPath = args => args.filter(identity).join(pathDelimiter);

// convert 'a/b/c' to ['a', 'b', 'c']
export const splitPath = path => path.split(pathDelimiter);

// Array.slice wrapper
export const slice = (array, begin, end) => Array.prototype.slice.call(array, begin, end);

// compose functions from args to () => a(b(c()))
export const compose = args => slice(args).reverse().reduce(
	(result, selector) => state => selector(result(state)),
	identity
);
