import { createSlice, PayloadAction, Action } from '@reduxjs/toolkit';
import { AsyncState, asyncState } from '../utils/asyncState';
import { call, put, all, takeLatest } from 'redux-saga/effects';
import * as googleAPI from '../utils/gapi';

export interface UserInfo {
  uid: string;
  displayName: string;
  photoURL: string;
}

interface UserState {
  user: AsyncState<UserInfo, Error>;
}

const initialState: UserState = {
  user: asyncState.initial(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInRequest(state, _: Action) {
      state.user = asyncState.load();
    },
    signInSuccess(state, { payload: userInfo }: PayloadAction<UserInfo>) {
      state.user = asyncState.success(userInfo);
    },
    signInFailure(state, { payload: error }: PayloadAction<Error>) {
      state.user = asyncState.error(error);
    },
    signOut(state, _: Action) {
      state.user = asyncState.initial();
    },
  },
});

export const { signInSuccess, signInFailure } = userSlice.actions;

function* signInSaga() {
  try {
    const response: UserInfo = yield call(googleAPI.signIn);
    yield put(signInSuccess(response));
  } catch (e) {
    yield put(signInFailure(e));
  }
}

function* signOutSaga() {
  try {
    yield call(googleAPI.signOut);
    localStorage.removeItem('user');
  } catch (e) {
    console.log(e);
  }
}

export function* userSaga() {
  yield all([
    takeLatest('user/signInRequest', signInSaga),
    takeLatest('user/signOut', signOutSaga),
  ]);
}

const { actions, reducer: user } = userSlice;
export const { signInRequest, signOut } = actions;
export default user;
