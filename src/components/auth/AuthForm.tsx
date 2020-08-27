import React, { ReactElement, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {
	signInWithGoogle,
	signInWithEmailAndPassword,
	signUpWithEmailAndPassword,
	auth,
} from '../../utils/firebase';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../modules';
import { changeUser } from '../../modules/user';

interface Props {
	type: 'signin' | 'signup';
}

const textMap = {
	signin: 'Sign In',
	signup: 'Sign Up',
};

export default function AuthForm({ type }: Props): ReactElement {
	const { form, key, value } = useSelector(({ auth }: RootState) => ({}));
	const user = useSelector((state: RootState) => state.user.user);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		auth.onAuthStateChanged((userAuth) => {
			dispatch(changeUser(userAuth));
		});
	}, [dispatch]);

	useEffect(() => {
		if (user) {
			history.push('/home');
		}
	}, [user, history]);

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
						prefix={<UserOutlined className="site-form-item-icon" />}
						placeholder="username"
						onChange={(e) => setUsername(e.target.value)}
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
						type="password"
						prefix={<LockOutlined className="site-form-item-icon" />}
						placeholder="password"
						onChange={(e) => setPassword(e.target.value)}
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
							type="password"
							prefix={<LockOutlined className="site-form-item-icon" />}
							placeholder="confirm password"
							onChange={(e) => setPasswordConfirm(e.target.value)}
						/>
					</Form.Item>
				)}
				<Form.Item>
					<Button
						type="primary"
						block
						onClick={() => {
							if (type === 'signin') {
								signInWithEmailAndPassword(username, password);
							} else {
								if (password && password === passwordConfirm) {
									signUpWithEmailAndPassword(username, password);
								}
							}
						}}
					>
						{textMap[type]}
					</Button>
				</Form.Item>
				<Divider>or</Divider>
				<Form.Item>
					<Button
						type="primary"
						danger
						block
						onClick={signInWithGoogle}
					>{`${textMap[type]} with Google`}</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
