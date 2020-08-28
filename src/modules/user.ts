import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase';

type UserState = User | null;

const initialState: UserState = null;

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state: UserState, { payload: user }: PayloadAction<User>) {
			state = user;
		},
		signOut(state: UserState, _) {
			state = null;
		},
	},
});

const { actions, reducer: user } = userSlice;
export const { setUser, signOut } = actions;
export default user;

// import { createAction, createReducer } from '@reduxjs/toolkit';
// import { User } from 'firebase';

// type UserState = User | null;

// const prefix = '@user';

// export const changeUser = createAction(
// 	`${prefix}/CHANGE_USER`,
// 	(user: User) => ({
// 		payload: user,
// 	}),
// );

// const initialState: UserState = null;

// const user = createReducer(initialState, (builder) =>
// 	builder.addCase(changeUser, (_, { payload: user }) => user),
// );
