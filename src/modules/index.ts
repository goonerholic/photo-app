import { combineReducers } from '@reduxjs/toolkit';
import user from './user';
import auth from './auth';

const rootReducer = combineReducers({
	auth,
	user,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
