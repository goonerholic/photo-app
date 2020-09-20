import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AsyncState, asyncState } from '../utils/asyncState';
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchPhotos, FetchPhotoResponse } from '../utils/gapi';
import { FetchOptions, MediaItem } from './../utils/gapi';

interface PhotoState {
  keywords: string[];
  photo: AsyncState<FetchPhotoResponse>;
}

const initialState: PhotoState = {
  keywords: [],
  photo: asyncState.initial(),
};

const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    addKeyword(state, { payload: keyword }) {
      state.keywords = [...state.keywords, keyword];
    },
    removeKeyword(state, { payload: keyword }) {
      state.keywords = state.keywords.filter((kw) => kw !== keyword);
    },
    initializePhotos(state) {
      state.photo = asyncState.initial();
    },
    initializeKeywords(state) {
      state.keywords = [];
    },
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
      const newPhotos = state.photo.data?.mediaItems
        ? ([
            ...state.photo.data.mediaItems,
            photoResponse.mediaItems,
          ] as MediaItem[])
        : photoResponse.mediaItems;
      state.photo = asyncState.success({
        mediaItems: newPhotos || [],
        nextPageToken: photoResponse.nextPageToken || '',
      });
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
  addKeyword,
  removeKeyword,
  initializePhotos,
  initializeKeywords,
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
export {
  fetchPhotoRequest,
  addKeyword,
  removeKeyword,
  initializePhotos,
  initializeKeywords,
};
export default photo;
