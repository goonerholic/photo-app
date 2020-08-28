import React, { ReactElement } from 'react';
import AuthTemplate from './../components/auth/AuthTemplate';
import SignUpForm from './../containers/auth/SignUpForm';

export default function SignUpPage(): ReactElement {
	return (
		<div>
			<AuthTemplate>
				<SignUpForm />
			</AuthTemplate>
		</div>
	);
}
