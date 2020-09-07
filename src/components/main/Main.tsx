import React, { ReactElement } from 'react';
import { Button, Row, Col } from 'antd';
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
  return (
    <div
      css={{
        maxWidth: 1200,
        margin: 'auto',
      }}
    >
      <Row>
        <Col>Hello</Col>
      </Row>
      <Row>
        <Col>It's me</Col>
      </Row>
    </div>
  );
}
