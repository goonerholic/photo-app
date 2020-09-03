/**@jsx jsx */
import React, { ReactElement } from 'react';
import { Button, Divider } from 'antd';
import { jsx, css } from '@emotion/core';

interface Props {
	onGoogleAuth: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function AuthForm({ onGoogleAuth }: Props): ReactElement {
	return (
		<div>
			<Button
				type="primary"
				danger
				onClick={onGoogleAuth}
				block
				size="large"
				css={{ fontSize: '1.125rem', fontWeight: 'bold', marginTop: '1rem' }}
			>
				Start with Google account
			</Button>
		</div>
	);
}
