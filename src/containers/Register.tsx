import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {registerUser} from '../redux/actions/user.actions';
import {RootState} from '../redux/reducers';
import {RegisterComponent} from '../components/index';
import {resetFetch} from '../redux/actions/common.actions';
// import {StackNavigationProp} from '@react-navigation/stack';
// import {useNavigation} from '@react-navigation/native';
// import {RootStackParamList} from '../routes';
import {constraints} from '../utils/constraints';
import validate from 'validate.js';

interface Props {

}

export const Register: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const {error} = useSelector((state: RootState) => state.common);
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setisLoading] = useState(false);

  function onRegister(username: string, password: string, email: string) {
    const validateObj = validate({username: username, emailAddress: email, password: password}, constraints);
    const usernameErrorMsg = validateObj ? validateObj['username'] : undefined;
    const emailErrorMsg = validateObj ? validateObj['emailAddress'] : undefined;
    const passwordErrorMsg = validateObj ? validateObj['password'] : undefined;

    setUsernameError(usernameErrorMsg);
    setEmailError(emailErrorMsg);
    setPasswordError(passwordErrorMsg);

    if (password.length <= 0 && confirmPassword.length > 0) {
      return;
    }

    if (!usernameErrorMsg && !emailErrorMsg && !passwordErrorMsg && (confirmPassword === password)) {
      setisLoading(true);
      dispatch(registerUser({username: username, email: email, password: password}));
    }
  }

  function checkEmail(email: string) {
    const validateObj = validate({emailAddress: email}, constraints);
    const emailErrorMsg = validateObj ? validateObj['emailAddress'] : undefined;

    if (emailErrorMsg !== undefined) {
      setEmailError(emailErrorMsg);
    } else {
      setEmailError('');
    }
  }

  function checkPassword(password: string) {
    const validateObj = validate({password: password}, constraints);
    const passwordErrorMsg = validateObj ? validateObj['password'] : undefined;

    if (passwordErrorMsg !== undefined) {
      setPasswordError(passwordErrorMsg);
    } else {
      setPasswordError('');
    }
  }

  function checkUsername(username: string) {
    const validateObj = validate({username: username}, constraints);
    const usernameErrorMsg = validateObj ? validateObj['username'] : undefined;

    if (usernameErrorMsg !== undefined) {
      setUsernameError(usernameErrorMsg);
    } else {
      setUsernameError('');
    }
  }

  useEffect(() => {
    if (Object.keys(error).length > 0) {
      console.warn(error);
      dispatch(resetFetch());
      setisLoading(false);
    }
  })

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
        checkEmail={checkEmail}
        checkPassword={checkPassword}
        checkUsername={checkUsername}
        confirmPassword={confirmPassword}
        setconfirmPassword={setconfirmPassword}
      />
    </>
  );
};
