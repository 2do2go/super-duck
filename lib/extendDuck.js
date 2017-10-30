import { zip, has, isObject, isFunction, joinPath } from './utils';

// convert 'camelCase' to 'CAMEL_CASE'
const camelCaseRegExp = /([a-z\d])([A-Z]+)/g;
const normalizeTypeName = type =>
	type.trim().replace(camelCaseRegExp, '$1_$2').toUpperCase();

// normalize type and join with path
const buildType = (path, type) => joinPath([path, normalizeTypeName(type)]);

// convert types array to name-type map
const buildTypesMap = (path, types) => zip(
	types,
	types.map(type => buildType(path, type))
);

// create new object with proto and additional props
const getExtendedObject = (proto, props) => Object.assign(Object.create(proto), props);

const requiredProps = ['path', 'pathKeys', 'rootSelector'];

const extendDuck = (parent = {}, extension = {}) => {
	requiredProps.forEach((prop) => {
		if (!parent[prop]) {
			throw new Error(`Parent duck should have a "${prop}" property`);
		}
	});

	if (!isObject(extension)) {
		throw new Error('Extension should be an object');
	}

	// create new duck and
	// save parent duck to access parent properties
	const duck = {
		super: parent,
		path: parent.path,
		pathKeys: parent.pathKeys,
		rootSelector: parent.rootSelector
	};

	const getExtensionValue = (key, fallback) => {
		const value = extension[key] || fallback;
		if (isFunction(value)) {
			return value(duck, extension);
		}
		return value;
	};

	// create types map with inheritance
	// types could be already mapped
	let types = getExtensionValue('types', []);
	if (Array.isArray(types)) {
		types = buildTypesMap(parent.path, types);
	}
	duck.types = getExtendedObject(parent.types, types);

	// create actions map with inheritance
	const selectors = getExtensionValue('selectors', {});
	duck.selectors = getExtendedObject(parent.selectors, selectors);

	// create actions map with inheritance
	const actions = getExtensionValue('actions', {});
	duck.actions = getExtendedObject(parent.actions, actions);

	// create operations map with inheritance
	const operations = getExtensionValue('operations', {});
	duck.operations = getExtendedObject(parent.operations, operations);

	// override initialState only if defined
	if (has(extension, 'initialState')) {
		duck.initialState = getExtensionValue('initialState');
	} else {
		duck.initialState = parent.initialState;
	}

	// get reducer from "reducer" property or create new reducer with "createReducer"
	let reducer;
	if (has(extension, 'reducer')) {
		reducer = extension.reducer;
	} else if (has(extension, 'createReducer')) {
		reducer = extension.createReducer(duck, extension);
	} else {
		reducer = parent.reducer;
	}
	duck.reducer = (state = duck.initialState, action) => reducer(state, action);

	return duck;
};

export default extendDuck;
