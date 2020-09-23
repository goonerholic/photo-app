/**@jsx jsx */
import React, { ReactElement, useCallback, useEffect, useRef } from 'react';
import { jsx } from '@emotion/core';
import { MediaItem } from './../../utils/gapi';
import { FetchOptions } from './../../utils/gapi';
import Gallery from 'react-photo-gallery';
import { Spin } from 'antd';

interface Props {
  photos: MediaItem[] | null;
  keywords: string[];
  pageToken?: string;
  loading: boolean;
  error: boolean;
  loadMore: (fetchOptions: FetchOptions) => void;
}

export default function Photos({
  photos,
  pageToken,
  keywords,
  loading,
  error,
  loadMore,
}: Props): ReactElement {
  const galleryPhoto = photos?.map((photo) => ({
    src: photo.baseUrl,
    width: parseInt(photo.mediaMetadata.width),
    height: parseInt(photo.mediaMetadata.height),
  }));

  const loader = useRef<HTMLDivElement | null>(null);
  const observer = new IntersectionObserver((entries) => {
    if (loading) return;
    if (entries[0].isIntersecting && !loading && pageToken !== '') {
      console.log('visible');
      loadMore({ keywords, pageToken, pageSize: 20 });
    }
  });

  useEffect(() => {
    if (loading) return;
    if (pageToken === '') return;
    if (!photos || !photos.length) return;
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer && observer.disconnect();
  }, [observer, pageToken, loading, photos]);

  return (
    <div
      css={{
        maxWidth: 1200,
        margin: '40px auto',
        textAlign: 'center',
      }}
    >
      {galleryPhoto && <Gallery photos={galleryPhoto} />}
      {/* <div
        css={{
          display: 'flex',
          flexWrap: 'wrap',
          marginTop: '2rem',
          justifyContent: 'space-between',
        }}
      >
        {photos && photos.length
          ? photos.map((photo) => (
              <img
                src={`${photo.baseUrl}=h256`}
                alt={photo.description}
                key={photo.description}
                css={{
                  marginBottom: '0.5rem',
                }}
              />
            ))
          : null}
      </div> */}
      <div
        css={{
          paddingTop: '2rem',
        }}
      >
        {loading ? (
          <Spin />
        ) : !photos ? (
          '사진을 검색해 보세요'
        ) : !photos.length ? (
          '검색 결과가 없습니다.'
        ) : (
          ''
        )}
      </div>
      <div>{error && <div>Error</div>}</div>

      {/* {photos?.length && pageToken && !loading ? (
        <div css={{ height: 200, display: 'block' }}>
          <Divider plain>
            <Button
              onClick={() => loadMore({ keywords, pageSize: 50, pageToken })}
            >
              Load more
            </Button>
          </Divider>
        </div>
      ) : null} */}
      <div className="loader" ref={loader}></div>
    </div>
  );
}
