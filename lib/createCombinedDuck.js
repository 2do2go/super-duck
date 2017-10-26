import { combineReducers } from 'redux';

import createDuck from './createDuck';
import getDuckReducers from './getDuckReducers';

const createCombinedDuck = (options) => {
	const { path, ducks } = options;

	return createDuck({
		path,
		reducer: combineReducers(getDuckReducers(ducks))
	});
};

export default createCombinedDuck;
