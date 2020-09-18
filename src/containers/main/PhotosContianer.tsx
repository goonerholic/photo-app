import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { fetchPhotoRequest } from '../../modules/photos';
import Photos from './../../components/main/Photos';
import { FetchOptions } from './../../utils/gapi';

export default function PhotosContianer(): ReactElement {
  const { photos, pageToken, keywords } = useSelector(
    ({ photo }: RootState) => ({
      photos: photo.photo.data?.mediaItems || [],
      pageToken: photo.photo.data?.nextPageToken || '',
      keywords: photo.keywords || [],
    }),
  );

  const dispatch = useDispatch();

  const fetchPhotos = ({ keywords, pageSize, pageToken }: FetchOptions) => {
    dispatch(fetchPhotoRequest({ keywords, pageSize, pageToken }));
  };

  return (
    <Photos
      photos={photos}
      pageToken={pageToken}
      fetchPhotos={fetchPhotos}
      keywords={keywords}
    />
  );
}
