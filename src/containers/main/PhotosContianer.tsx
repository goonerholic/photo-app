import React, { ReactElement, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { fetchPhotoRequest, loadMoreRequest } from '../../modules/photos';
import Photos from './../../components/main/Photos';
import { FetchOptions } from './../../utils/gapi';
import { initializePhotos } from '../../modules/photos';

export default function PhotosContianer(): ReactElement {
  const { photos, pageToken, keywords, loading, error } = useSelector(
    ({ photo }: RootState) => ({
      photos: photo.photo.data?.mediaItems || null,
      pageToken: photo.photo.data?.nextPageToken || '',
      keywords: photo.keywords || [],
      loading: photo.photo.loading,
      error: photo.photo.error,
    }),
  );

  const dispatch = useDispatch();

  const loadMore = useCallback(
    ({ keywords, pageSize, pageToken }: FetchOptions) => {
      dispatch(loadMoreRequest({ keywords, pageSize, pageToken }));
    },
    [dispatch],
  );

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
      error={!!error}
      loadMore={loadMore}
    />
  );
}
