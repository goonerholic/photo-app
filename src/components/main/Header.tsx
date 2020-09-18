/**@jsx jsx*/
import React, { ReactElement } from 'react';
import { Row, Col, Button } from 'antd';
import { jsx, css } from '@emotion/core';

interface Props {
  onSignOut: () => void;
}

export default function Header({ onSignOut }: Props): ReactElement {
  return (
    <Row
      justify="space-between"
      align="middle"
      css={{
        height: 80,
        boxShadow: '0 4px 8px -2px gray',
        padding: '0 2rem',
      }}
    >
      <Col>
        <h2>Photo App</h2>
      </Col>
      <Col>
        <Button type="primary" onClick={onSignOut}>
          Sign Out
        </Button>
      </Col>
    </Row>
  );
}
