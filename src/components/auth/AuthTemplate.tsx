/**@jsx jsx*/
import React, { ReactElement } from 'react';
import { Row, Col } from 'antd';
import { jsx } from '@emotion/core';
interface Props {
  children: ReactElement;
}

export default function AuthTemplate({ children }: Props): ReactElement {
  return (
    <Row
      justify="center"
      align="middle"
      css={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: 'url("/auth-background.jpg")',
        backgroundSize: 'cover',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backgroundBlendMode: 'color',
      }}
    >
      <Col
        xs={20}
        sm={18}
        md={12}
        lg={8}
        xl={6}
        css={{
          fontSize: '1.125rem',
          'h1, p': {
            color: 'white',
          },
        }}
      >
        <h1>Photo Picker</h1>
        <p>
          Pick the best out of randomly curated photos from your Google photos
          library.
        </p>

        {children}
      </Col>
    </Row>
  );
}
