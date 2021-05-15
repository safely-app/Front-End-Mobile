import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {loginUser} from '../redux/actions/user.actions';
import {RootState} from '../redux/reducers';
import {LoginComponent} from '../components/index';
import {useNavigation} from '@react-navigation/native';
import {validate} from 'validate.js';
import {constraints} from '../utils/constraints';
import { FastField } from 'formik';
// import {StackNavigationProp} from '@react-navigation/stack';
// import {RootStackParamList} from '../redux/types';
// type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  // navigation: ProfileScreenNavigationProp,
}

export const Login: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const {credentials} = useSelector((state: RootState) => state.user);
  const [username, setUsername] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const navigation = useNavigation();


  function onLogin(username: string, password: string) {
    const validateObj = validate({emailAddress: username, password: password}, constraints);
    const emailErrorMsg = validateObj ? validateObj['emailAddress'] : undefined;
    const passwordErrorMsg = validateObj ? validateObj['password'] : undefined;

    setEmailError(emailErrorMsg);
    setPasswordError(passwordErrorMsg);


    if (!emailErrorMsg || !passwordErrorMsg) {
      setisLoading(true);
      dispatch(loginUser({username, password}));
    }
  }

  function goToRegister() {
    navigation.navigate('Register');
  }

  useEffect(() => {
    if (credentials.token) {
      console.warn('Logged In');
      setisLoading(false);
    } else if (credentials.token === undefined) {
      console.warn('Wrong credentials, try again.');
      setisLoading(false);
    }
  });

  return (
    <>
      <LoginComponent
        setUsername={setUsername}
        setPassword={setPassword}
        onLogin={onLogin}
        username={username}
        password={password}
        isLoading={isLoading}
        goToRegister={goToRegister}
        emailError={emailError}
        passwordError={passwordError}
      />
    </>
  );
};
