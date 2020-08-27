import { createAction, createReducer, ActionType } from 'typesafe-actions';
import { User } from 'firebase';

interface UserState {
	user: User | null;
}

const prefix = '@user';

const CHANGE_USER = `${prefix}/CHANGE_USER`;

export const changeUser = createAction(CHANGE_USER, (user) => user)();

const initialState: UserState = {
	user: null,
};

const user = createReducer<UserState, ActionType<typeof changeUser>>(
	initialState,
).handleAction(changeUser, (state, { payload: user }) => ({
	...state,
	user,
}));

export default user;
