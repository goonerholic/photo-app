import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
// import { fetchPhotoRequest } from '../../modules/photos';
import Photos from './../../components/main/Photos';
// import { FetchOptions } from './../../utils/gapi';
import { initializePhotos } from '../../modules/photos';

export default function PhotosContianer(): ReactElement {
  const { photos, pageToken, keywords, loading } = useSelector(
    ({ photo }: RootState) => ({
      photos: photo.photo.data?.mediaItems || null,
      pageToken: photo.photo.data?.nextPageToken || '',
      keywords: photo.keywords || [],
      loading: photo.photo.loading,
    }),
  );

  const dispatch = useDispatch();

  // const fetchPhotos = ({ keywords, pageSize, pageToken }: FetchOptions) => {
  //   dispatch(fetchPhotoRequest({ keywords, pageSize, pageToken }));
  // };

  useEffect(() => {
    return function () {
      dispatch(initializePhotos());
    };
  }, [dispatch]);

  return (
    <Photos
      photos={photos}
      pageToken={pageToken}
      keywords={keywords}
      loading={loading}
    />
  );
}
