import { combineReducers } from 'redux';

import { slice, isEqual } from './utils';
import createDuck from './createDuck';
import getDuckReducers from './getDuckReducers';

const createCombinedDuck = (options) => {
	const { path, ducks = [] } = options;

	return createDuck({
		path,
		createReducer: (combinedDuck) => {
			ducks.forEach((duck) => {
				const duckParentPathKeys = slice(duck.pathKeys, 0, -1);

				if (!isEqual(combinedDuck.pathKeys, duckParentPathKeys)) {
					throw new Error(`Each duck should have path with prefix "${path}"`);
				}
			});

			return combineReducers(getDuckReducers(ducks));
		}
	});
};

export default createCombinedDuck;
