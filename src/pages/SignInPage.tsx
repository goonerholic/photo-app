import React, { ReactElement } from 'react';
import AuthTemplate from './../components/auth/AuthTemplate';
import AuthForm from './../components/auth/AuthForm';

export default function SignInPage(): ReactElement {
	return (
		<div>
			<AuthTemplate>
				<AuthForm type="signin" />
			</AuthTemplate>
		</div>
	);
}
