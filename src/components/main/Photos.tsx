/**@jsx jsx */
import React, { ReactElement } from 'react';
import { jsx } from '@emotion/core';
import { MediaItem } from './../../utils/gapi';
import { FetchOptions } from './../../utils/gapi';
import { Button } from 'antd';
import { Divider } from 'antd';
import Gallery from 'react-photo-gallery';

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
  // const loader = useRef<HTMLDivElement>(null);
  // const loadMore = useCallback(
  //   (entries: any) => {
  //     console.log(entries);
  //     const target = entries[0];
  //     console.log(target.isIntersecting);
  //     console.log(target);
  //     if (target.isIntersecting) {
  //       fetchPhotos({ keywords, pageToken });
  //     }
  //   },
  //   [fetchPhotos, pageToken, keywords],
  // );

  // useEffect(() => {
  //   const options = {
  //     root: null,
  //     rootMargin: '0px',
  //     threshold: 1,
  //   };

  //   const observer = new IntersectionObserver(loadMore, options);
  //   if (loader && loader.current) {
  //     observer.observe(loader.current as HTMLDivElement);
  //   }
  // }, [loadMore]);

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
      <div>
        {loading
          ? '로딩 중...'
          : !photos
          ? '사진을 검색해 보세요'
          : !photos.length
          ? '검색 결과가 없습니다.'
          : ''}
      </div>
      <div>{error && <div>Error</div>}</div>

      {photos?.length && pageToken && !loading ? (
        <div css={{ height: 200, display: 'block' }}>
          <Divider plain>
            <Button
              onClick={() => loadMore({ keywords, pageSize: 50, pageToken })}
            >
              Load more
            </Button>
          </Divider>
        </div>
      ) : null}
    </div>
  );
}
