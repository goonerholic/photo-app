import React, { ReactElement } from 'react';
import { Row, Col } from 'antd';

interface Props {
	children: ReactElement;
}

export default function AuthTemplate({ children }: Props): ReactElement {
	return (
		<Row justify="center" align="middle">
			<Col span={8}>
				<div>
					<h3>Photo-App</h3>
				</div>
				{children}
			</Col>
		</Row>
	);
}
