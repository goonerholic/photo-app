import React, { ReactElement } from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import AuthFormContainer from './../containers/auth/AuthFormContainer';

export default function AuthPage(): ReactElement {
	return (
		<AuthTemplate>
			<AuthFormContainer />
		</AuthTemplate>
	);
}
