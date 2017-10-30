import { last, slice, isEqual } from './utils';

const getDuckReducers = (ducks) => {
	if (!ducks.length) return {};

	const firstParentPathKeys = slice(ducks[0].pathKeys, 0, -1);

	return ducks.reduce((reducers, duck) => {
		const parentPathKeys = slice(duck.pathKeys, 0, -1);

		if (!isEqual(firstParentPathKeys, parentPathKeys)) {
			throw new Error(`Each duck should have path with prefix "${firstParentPathKeys.join('/')}"`);
		}

		const key = last(duck.pathKeys);

		if (reducers[key]) {
			throw new Error(`Duck with path "${duck.path}" already exists`);
		}

		reducers[key] = duck.reducer;

		return reducers;
	}, {});
};

export default getDuckReducers;
