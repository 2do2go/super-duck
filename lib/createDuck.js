import extendDuck from './extendDuck';
import { identity, compose, splitPath } from './utils';

// create composed selector from path to get values from deep nested objects
const createDeepSelector = (keys) => {
	const selectors = [...keys].reverse().map(key => state => state[key]);
	return compose(selectors);
};

const createDuck = (options = {}) => {
	const { path } = options;

	if (!path) {
		throw new Error('"path" option is required');
	}

	const {
		pathKeys = splitPath(path),
		rootSelector = createDeepSelector(pathKeys)
	} = options;

	return extendDuck({
		path,
		pathKeys,
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
