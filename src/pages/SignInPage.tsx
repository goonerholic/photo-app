import React, { ReactElement } from 'react';
import AuthTemplate from './../components/auth/AuthTemplate';
import SignInForm from './../containers/auth/SignInForm';

export default function SignInPage(): ReactElement {
	return (
		<div>
			<AuthTemplate>
				<SignInForm />
			</AuthTemplate>
		</div>
	);
}
