import React, { ReactElement, useEffect, useState } from 'react';
import AuthForm from './../../components/auth/AuthForm';
import { useHistory } from 'react-router-dom';
import { gapiInit, signIn } from '../../utils/gapi';

export default function AuthFormContainer(): ReactElement {
	const history = useHistory();
	useEffect(() => {
		const init = async () => {
			const googleAuth = await gapiInit();
			if (googleAuth.isSignedIn.get()) {
				history.push('/main');
			}

			googleAuth.currentUser.listen((user) => {
				console.log(user);
				if (user) {
					history.push('/main');
				}
			});
		};
		init();
	}, [history]);

	const onGoogleAuth = async (e: React.MouseEvent) => {
		await signIn(gapi.auth2.getAuthInstance());
	};

	return <AuthForm onGoogleAuth={onGoogleAuth} />;
}
