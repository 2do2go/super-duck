const getDuckReducers = ducks => ducks.reduce((reducers, duck) => {
	reducers[duck.key] = duck.reducer;
	return reducers;
}, {});

export default getDuckReducers;
