import React, { ReactElement } from 'react';
import { Form, Input, Button, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { User } from 'firebase';
// import {
// 	signInWithGoogle,
// 	signInWithEmailAndPassword,
// 	signUpWithEmailAndPassword,
// 	auth,
// } from '../../utils/firebase';

interface Props {
	type: 'signin' | 'signup';
	form: {
		username: string;
		password: string;
		passwordConfirm?: string;
	};
	user: User | null;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	onGoogleAuth: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const textMap = {
	signin: 'Sign In',
	signup: 'Sign Up',
};

export default function AuthForm({
	type,
	form,
	user,
	onChange,
	onSubmit,
	onGoogleAuth,
}: Props): ReactElement {
	if (user) {
		return (
			<div>
				<h4>Already signed in!!</h4>
				<p>{user.email}</p>
			</div>
		);
	}
	return (
		<div>
			<h4>{textMap[type]}</h4>
			<Form name="auth" onFinish={onSubmit}>
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
						prefix={<UserOutlined className="site-form-item-icon" />}
						name="username"
						placeholder="username"
						onChange={onChange}
						value={form.username}
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
					<Input
						name="password"
						type="password"
						prefix={<LockOutlined className="site-form-item-icon" />}
						placeholder="password"
						onChange={onChange}
						value={form.password}
					/>
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
						<Input
							name="passwordConfirm"
							type="password"
							prefix={<LockOutlined className="site-form-item-icon" />}
							placeholder="confirm password"
							onChange={onChange}
							value={form.passwordConfirm}
						/>
					</Form.Item>
				)}
				<Form.Item>
					<Button htmlType="submit" type="primary" block>
						{textMap[type]}
					</Button>
				</Form.Item>
				<Divider>or</Divider>
				<Form.Item>
					<Button
						type="primary"
						danger
						block
						onClick={onGoogleAuth}
					>{`${textMap[type]} with Google`}</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
