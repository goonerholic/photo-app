/**@jsx jsx*/
import React, { ReactElement } from 'react';
import { Row, Col } from 'antd';
import { jsx, css } from '@emotion/core';
import bgImg from '../../images/auth-background.jpg';
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
				background: `url(${bgImg})`,
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
					Choose one out of random-picked photos from your Google photo library.
				</p>

				{children}
			</Col>
		</Row>
	);
}
