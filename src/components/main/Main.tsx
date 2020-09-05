import React, { ReactElement } from 'react';
import { Button, Row } from 'antd';
import { FetchPhotoResponse } from '../../utils/gapi';
import { FetchOptions } from './../../utils/gapi';
import { UserInfo } from './../../modules/user';

interface Props {
  onFetch: (fetchOptions: FetchOptions) => void;
  onSignOut: (googleUser: gapi.auth2.GoogleUser) => void;
  photo: FetchPhotoResponse | null;
  googleUser: UserInfo | null;
}

export default function Main({
  onFetch,
  onSignOut,
  photo,
  googleUser,
}: Props): ReactElement {
  return <Row></Row>;
}
