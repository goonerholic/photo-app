/**@jsx jsx */
import React, { ReactElement } from 'react';
import { jsx } from '@emotion/core';
import { MediaItem } from './../../utils/gapi';
// import { FetchOptions } from './../../utils/gapi';

interface Props {
  photos: MediaItem[] | null;
  keywords: string[];
  pageToken?: string;
  loading: boolean;
  // fetchPhotos: (fetchOptions: FetchOptions) => void;
}

export default function Photos({
  photos,
  pageToken,
  keywords,
  loading,
}: Props): ReactElement {
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
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <div
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
      </div>
      <div>
        {loading
          ? '로딩 중...'
          : !photos
          ? '사진을 검색해 보세요'
          : !photos.length
          ? '검색 결과가 없습니다.'
          : ''}
      </div>
      <div css={{ height: 200, display: 'block' }}>loader</div>
    </div>
  );
}
