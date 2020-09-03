import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from '../utils/firebase';
import { AsyncState, asyncState } from '../utils/asyncState';

interface AuthState {
	auth: AsyncState<gapi.auth2.GoogleAuth, Error>;
}

const initialState = {
	auth: asyncState.initial,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		googleAuthRequest(state, _) {
			state.auth = asyncState.load();
		},
		googleAuthSuccess(state, { payload: userInfo }: PayloadAction<UserInfo>) {
			state.auth = asyncState.success(userInfo);
		},
		googleAuthFailure(state, { payload: error }: PayloadAction<Error>) {
			state.auth = asyncState.error(error);
		},
	},
});

function* googleAuthSaga() {}

function* emailAuthSaga(email: string, password: string) {}

const { actions, reducer: auth } = authSlice;
export const { initializeForm, changeField } = actions;
export default auth;
