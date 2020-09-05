import React, { ReactElement } from 'react';
import MainContainer from './../containers/main/MainContainer';
import Header from './../components/main/Header';

export default function MainPage(): ReactElement {
  return (
    <div>
      <Header />
      <MainContainer />
    </div>
  );
}
