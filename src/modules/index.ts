import { combineReducers } from '@reduxjs/toolkit';
import photo, { photoSaga } from './photos';
import { all } from 'redux-saga/effects';
import user, { userSaga } from './user';

const rootReducer = combineReducers({
  photo,
  user,
});

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
  yield all([userSaga(), photoSaga()]);
}

export default rootReducer;
