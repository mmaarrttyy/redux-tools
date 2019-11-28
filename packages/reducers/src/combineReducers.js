import { length, mapObjIndexed, pickBy, keys, o } from 'ramda';
import { isFunction } from 'ramda-extension';

export default reducers => {
	const finalReducers = pickBy(isFunction, reducers);
	const finalReducerKeys = keys(finalReducers);

	return (state = {}, action) => {
		let hasChanged = false;
		const nextState = { ...state };

		mapObjIndexed(key => {
			const reducer = finalReducers[key];
			const previousStateForKey = state[key];
			const nextStateForKey = reducer(previousStateForKey, action);
			nextState[key] = nextStateForKey;
			hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
		}, finalReducerKeys);

		hasChanged = hasChanged || length(finalReducerKeys) !== o(length, keys)(state);
		return hasChanged ? nextState : state;
	};
};