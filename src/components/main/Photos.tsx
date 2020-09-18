/**@jsx jsx */
import React, { ReactElement, useCallback, useEffect, useRef } from 'react';
import { jsx } from '@emotion/core';
import { MediaItem } from './../../utils/gapi';
import { FetchOptions } from './../../utils/gapi';

interface Props {
  photos: MediaItem[];
  keywords: string[];
  pageToken?: string;
  fetchPhotos: (fetchOptions: FetchOptions) => void;
}

export default function Photos({
  photos,
  pageToken,
  fetchPhotos,
  keywords,
}: Props): ReactElement {
  const loader = useRef<HTMLDivElement>(null);
  const loadMore = useCallback(
    (entries: any) => {
      console.log(entries);
      const target = entries[0];
      console.log(target.isIntersecting);
      console.log(target);
      if (target.isIntersecting) {
        fetchPhotos({ keywords, pageToken });
      }
    },
    [fetchPhotos, pageToken, keywords],
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    };

    const observer = new IntersectionObserver(loadMore, options);
    if (loader && loader.current) {
      observer.observe(loader.current as HTMLDivElement);
    }
  }, [loadMore]);

  return (
    <div css={{}}>
      <div
        css={{
          minHeight: 800,
          display: 'flex',
          flexWrap: 'wrap',
          marginTop: '2rem',
        }}
      >
        {photos.length
          ? photos.map((photo) => (
              <img
                src={`${photo.baseUrl}=h256`}
                alt={photo.description}
                key={photo.description}
              />
            ))
          : '사진을 불러오세요'}
      </div>
      <div ref={loader} css={{ height: 200, display: 'block' }}>
        loader
      </div>
    </div>
  );
}
