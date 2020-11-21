import React, { ReactElement } from 'react';
import AuthForm from './../../components/auth/AuthForm';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules/index';
import { signInRequest } from '../../modules/user';
import { Redirect } from 'react-router-dom';

export default function AuthFormContainer(): ReactElement {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const onSignIn = async (e: React.MouseEvent) => {
    dispatch(signInRequest());
  };

  return user.data ? <Redirect to="/" /> : <AuthForm onSignIn={onSignIn} />;
}
