import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {registerUser} from '../redux/actions/user.actions';
import {RootState} from '../redux/reducers';
import {RegisterComponent} from '../components/index';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../routes';

interface Props {

}

export const Register: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const {credentials} = useSelector((state: RootState) => state.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  function onRegister(username: string, password: string, email: string) {
    dispatch(registerUser({username, email, password}));
  }

  return (
    <>
      <RegisterComponent
        setUsername={setUsername}
        setPassword={setPassword}
        setEmail={setEmail}
        username={username}
        password={password}
        email={email}
        onRegister={onRegister}
      />
    </>
  );
};
