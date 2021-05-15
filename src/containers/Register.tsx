import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {registerUser} from '../redux/actions/user.actions';
import {RootState} from '../redux/reducers';
import {RegisterComponent} from '../components/index';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../routes';
import {constraints} from '../utils/constraints';
import validate from 'validate.js';

interface Props {

}

export const Register: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const {credentials} = useSelector((state: RootState) => state.user);
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const navigation = useNavigation();

  function onRegister(username: string, password: string, email: string) {
    const validateObj = validate({username: username, emailAddress: email, password: password}, constraints);
    const usernameErrorMsg = validateObj ? validateObj['username'] : undefined;
    const emailErrorMsg = validateObj ? validateObj['emailAddress'] : undefined;
    const passwordErrorMsg = validateObj ? validateObj['password'] : undefined;

    setUsernameError(usernameErrorMsg);
    setEmailError(emailErrorMsg);
    setPasswordError(passwordErrorMsg);


    if (!usernameErrorMsg || !emailErrorMsg || !passwordErrorMsg) {
      setisLoading(true);
      dispatch(registerUser({username: username, email: email, password: password}));
    }
  }

  useEffect(() => {
    if (credentials.token) {
      console.warn('Registered');
      setisLoading(false);
    } else if (credentials.token === undefined) {
      console.warn('Wrong credentials, try again.');
      setisLoading(false);
    }
  });

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
        usernameError={usernameError}
        emailError={emailError}
        passwordError={passwordError}
        isLoading={isLoading}
      />
    </>
  );
};
