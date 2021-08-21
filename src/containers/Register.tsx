import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {registerUser} from '../redux/actions/user.actions';
import {RootState} from '../redux/reducers';
import {RegisterComponent} from '../components/index';
import {resetFetch} from '../redux/actions/common.actions';
import {constraints} from '../utils/constraints';
import validate from 'validate.js';


export const Register = (): JSX.Element => {
  const dispatch = useDispatch();
  const {error} = useSelector((state: RootState) => state.common);
  const [username, setUsername] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setconfirmPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isLoading, setisLoading] = useState<boolean>(false);

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
