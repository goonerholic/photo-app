import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AsyncState, asyncState } from '../utils/asyncState';
import { call, put, all, takeLatest } from 'redux-saga/effects';
import { fetchPhotos, FetchPhotoResponse } from '../utils/gapi';
import { FetchOptions } from './../utils/gapi';

interface PhotoState {
  photo: AsyncState<FetchPhotoResponse, Error>;
}

const initialState: PhotoState = {
  photo: asyncState.initial(),
};

const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    fetchPhotoRequest: {
      reducer: (state, action: PayloadAction<FetchOptions>) => {
        state.photo = asyncState.load();
      },
      prepare: ({ keywords, pageSize, pageToken }: FetchOptions) => {
        return {
          payload: { keywords, pageSize, pageToken },
        };
      },
    },
    fetchPhotoSuccess(
      state,
      { payload: photoResponse }: PayloadAction<FetchPhotoResponse>,
    ) {
      state.photo = asyncState.success(photoResponse);
    },
    fetchPhotoFailure(state, { payload: error }: PayloadAction<Error>) {
      state.photo = asyncState.error(error);
    },
  },
});

const {
  fetchPhotoRequest,
  fetchPhotoSuccess,
  fetchPhotoFailure,
} = photoSlice.actions;

function* fetchPhotoSaga(action: ReturnType<typeof fetchPhotoRequest>) {
  try {
    const response: FetchPhotoResponse = yield call(
      fetchPhotos,
      action.payload,
    );
    yield put(fetchPhotoSuccess(response));
  } catch (e) {
    yield put(fetchPhotoFailure(e));
  }
}

export function* photoSaga() {
  yield takeLatest('photo/fetchPhotoRequest', fetchPhotoSaga);
}

const { reducer: photo } = photoSlice;
export { fetchPhotoRequest };
export default photo;
