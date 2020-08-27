import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';

interface Props {}

export default function SignInForm({}: Props): ReactElement {
	const { form } = useSelector(({ auth }: RootState) => ({
		form: auth.signin,
	}));

	return <div></div>;
}
