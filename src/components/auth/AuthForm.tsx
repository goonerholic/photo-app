/**@jsx jsx */
import React, { ReactElement } from 'react';
import { Button, Divider } from 'antd';
import { jsx, css } from '@emotion/core';

interface Props {
  onSignIn: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function AuthForm({ onSignIn }: Props): ReactElement {
  return (
    <div>
      <Button
        type="primary"
        danger
        onClick={onSignIn}
        block
        size="large"
        css={{ fontSize: '1.125rem', fontWeight: 'bold', marginTop: '1rem' }}
      >
        Start with Google account
      </Button>
    </div>
  );
}
