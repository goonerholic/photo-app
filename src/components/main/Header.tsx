import React, { ReactElement } from 'react';
/**@jsx jsx*/
import { Row, Col, Button } from 'antd';
import { signOut } from '../../utils/gapi';
import { jsx, css } from '@emotion/core';

interface Props {}

export default function Header({}: Props): ReactElement {
  return (
    <Row
      justify="space-between"
      align="middle"
      css={{
        height: 80,
        padding: 10,
      }}
    >
      <Col>
        <h2>Photo App</h2>
      </Col>
      <Col>
        <Button
          type="primary"
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </Button>
      </Col>
    </Row>
  );
}
