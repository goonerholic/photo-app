import React, { ReactElement } from 'react';
import { Form, Input, Button, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

interface Props {
	type: 'signin' | 'signup';
}

const textMap = {
	signin: 'Sign In',
	signup: 'Sign Up',
};

export default function AuthForm({ type }: Props): ReactElement {
	return (
		<div>
			<h4>{textMap[type]}</h4>
			<Form name="auth">
				<Form.Item
					name="username"
					rules={[
						{
							required: true,
							message: 'Please input your username!',
						},
					]}
				>
					<Input
						prefix={
							<UserOutlined className="site-form-item-icon" />
						}
						placeholder="username"
					/>
				</Form.Item>
				<Form.Item
					name="password"
					rules={[
						{
							required: true,
							message: 'Please input password!',
						},
					]}
				>
					<Input placeholder="password" />
				</Form.Item>
				{type === 'signup' && (
					<Form.Item
						name="passwordConfirm"
						rules={[
							{
								required: true,
								message: 'Confirm your password!',
							},
						]}
					>
						<Input placeholder="confirm password" />
					</Form.Item>
				)}
				<Form.Item>
					<Button type="primary" block>
						{textMap[type]}
					</Button>
				</Form.Item>
				<Divider>or</Divider>
				<Form.Item>
					<Button
						type="primary"
						danger
						block
					>{`${textMap[type]} with Google`}</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
