import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase';

export interface UserState {
	username: string | null;
	email: string | null;
	uid: string | null;
}

const initialState: UserState = {
	username: '',
	email: '',
	uid: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state: UserState, { payload: user }: PayloadAction<User>) {
			state = { username: user.displayName, email: user.email, uid: user.uid };
		},
		signOut(state: UserState, _) {
			state = {
				username: '',
				email: '',
				uid: '',
			};
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
