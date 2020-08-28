import React, { ReactElement, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import AuthForm from './../../components/auth/AuthForm';
import { changeField, initializeForm } from './../../modules/auth';
import {
	signInWithGoogle,
	signUpWithEmailAndPassword,
	auth,
} from './../../utils/firebase';
import { setUser } from '../../modules/user';

export default function SignUpForm(): ReactElement {
	const { form, user } = useSelector(({ auth, user }: RootState) => ({
		form: auth,
		user: user,
	}));

	const dispatch = useDispatch();

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				dispatch(setUser(user));
			}
		});
	}, [dispatch]);

	useEffect(() => {
		dispatch(initializeForm());
	}, [dispatch]);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		dispatch(
			changeField({
				key: name as 'username' | 'password' | 'passwordConfirm',
				value,
			}),
		);
	};

	const onSubmit = async (e: React.FormEvent) => {
		const { username, password, passwordConfirm } = form;
		if (password !== passwordConfirm) {
			console.log('password confirm error');
			return;
		}
		await signUpWithEmailAndPassword(username, password);
	};

	const onGoogleAuth = async (e: React.MouseEvent<HTMLButtonElement>) => {
		await signInWithGoogle();
	};

	return (
		<AuthForm
			type="signup"
			form={form}
			user={user}
			onChange={onChange}
			onSubmit={onSubmit}
			onGoogleAuth={onGoogleAuth}
		/>
	);
}
