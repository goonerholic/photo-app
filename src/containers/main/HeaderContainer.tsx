import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../modules';
import { signOut } from '../../modules/user';
import Header from './../../components/main/Header';

export default function HeaderContainer(): ReactElement {
  const { user } = useSelector((state: RootState) => ({
    photo: state.photo.photo,
    user: state.user.user,
  }));

  const dispatch = useDispatch();
  const history = useHistory();

  const onSignOut = () => {
    dispatch(signOut());
  };

  useEffect(() => {
    if (!user.data) {
      history.push('/signin');
    }
  }, [history, user]);
  return <Header onSignOut={onSignOut} />;
}
