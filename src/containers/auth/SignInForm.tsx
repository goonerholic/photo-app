import React, { ReactElement, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import AuthForm from './../../components/auth/AuthForm';
import { changeField, initializeForm } from './../../modules/auth';
import {
	signInWithEmailAndPassword,
	signInWithGoogle,
	auth,
} from './../../utils/firebase';
import { setUser } from '../../modules/user';

export default function SignInForm(): ReactElement {
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

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		dispatch(
			changeField({
				key: name as 'username' | 'password',
				value,
			}),
		);
	};

	const onSubmit = async (e: React.FormEvent) => {
		const { username, password } = form;
		await signInWithEmailAndPassword(username, password);
	};

	const onGoogleAuth = async (e: React.MouseEvent<HTMLButtonElement>) => {
		await signInWithGoogle();
	};

	useEffect(() => {
		dispatch(initializeForm());
	}, [dispatch]);

	return (
		<AuthForm
			type="signin"
			form={form}
			user={user}
			onChange={onChange}
			onSubmit={onSubmit}
			onGoogleAuth={onGoogleAuth}
		/>
	);
}
