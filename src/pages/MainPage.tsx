import React, { ReactElement } from 'react';
import PhotosContianer from '../containers/main/PhotosContianer';
import HeaderContainer from './../containers/main/HeaderContainer';
import SearchFormContainer from './../containers/main/SearchFormContainer';

export default function MainPage(): ReactElement {
  return (
    <div>
      <HeaderContainer />
      <SearchFormContainer />
      <PhotosContianer />
    </div>
  );
}
