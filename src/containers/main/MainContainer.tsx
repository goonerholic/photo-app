import React, { ReactElement, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import { useHistory } from 'react-router-dom';
import { fetchPhotoRequest } from '../../modules/photos';
import { FetchOptions, signOut } from '../../utils/gapi';
import Main from '../../components/main/Main';
import { auth } from 'firebase';

export default function MainContainer(): ReactElement {
  const { photo, user } = useSelector((state: RootState) => ({
    photo: state.photo.photo,
    user: state.user.user,
  }));

  const dispatch = useDispatch();

  const fetchPhotos = ({ keywords, pageSize, pageToken }: FetchOptions) => {
    dispatch(fetchPhotoRequest({ keywords, pageSize, pageToken }));
  };

  return (
    <Main
      onFetch={fetchPhotos}
      onSignOut={signOut}
      photo={photo.data}
      googleUser={user.data}
    />
  );
}
