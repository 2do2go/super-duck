import extendDuck from './extendDuck';
import { last, identity, compose, splitPath } from './utils';

// create composed selector from path to get values from deep nested objects
const createDeepSelector = (path) => {
	const selectors = splitPath(path).reverse().map(key => state => state[key]);
	return compose(selectors);
};

const createDuck = (options = {}) => {
	const { path } = options;

	if (!path) {
		throw new Error('"path" option is required');
	}

	const {
		key = last(splitPath(path)),
		rootSelector = createDeepSelector(path)
	} = options;

	return extendDuck({
		path,
		key,
		rootSelector,
		types: {},
		selectors: {},
		actions: {},
		operations: {},
		initialState: undefined,
		reducer: identity
	}, options);
};

export default createDuck;
