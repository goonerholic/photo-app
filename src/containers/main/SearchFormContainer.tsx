import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchForm from '../../components/main/SearchForm';
import { RootState } from '../../modules';
import {
  addKeyword,
  fetchPhotoRequest,
  removeKeyword,
} from '../../modules/photos';

export default function SearchFormContainer(): ReactElement {
  const dispatch = useDispatch();
  const keywords = useSelector((state: RootState) => state.photo.keywords);

  const onAdd = (keyword: string) => dispatch(addKeyword(keyword));
  const onRemove = (keyword: string) => dispatch(removeKeyword(keyword));
  const onSubmit = (
    keywords: string[],
    pageSize?: number,
    pageToken?: string,
  ) => dispatch(fetchPhotoRequest({ keywords, pageSize, pageToken }));

  return (
    <SearchForm
      keywords={keywords}
      onAdd={onAdd}
      onRemove={onRemove}
      onSubmit={onSubmit}
    />
  );
}
