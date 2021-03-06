import React, {useEffect, useState} from 'react';
import { useAppSelector, useAppDispatch } from '../utils/hooks';
import { loginUser, resetFetchStatus } from '../redux';
import {LoginComponent} from '../components/index';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {validate} from 'validate.js';
import {constraints} from '../utils/constraints';
import {Linking, Platform} from 'react-native';
import {extractTokenAndUserId} from '../utils/utils';
import Toast from 'react-native-toast-message';
import {AppState} from '../utils/isAppLaunched';

export const Login = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {credentials, statusResponse} = useAppSelector((state) => state.user);
  const [username, setUsername] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setisLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  function onLogin(username: string, password: string) {
    const validateObj = validate({emailAddress: username, password: password}, constraints);
    const emailErrorMsg = validateObj ? validateObj['emailAddress'] : undefined;
    const passwordErrorMsg = validateObj ? validateObj['password'] : undefined;

    setEmailError(emailErrorMsg);
    setPasswordError(passwordErrorMsg);


    if (!emailErrorMsg && !passwordErrorMsg) {
      setisLoading(true);
      dispatch(loginUser({email: username, password: password}));
    }
  }

  function goToRegister() {
    navigation.navigate('Register');
  }

  function goToForgetPWD() {
    navigation.navigate('ForgotPWD');
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

  useEffect(() => {
    if (Platform.OS === "android") {
      // Detect deep-linking when the app is already launched
      Linking.addEventListener('url', (event) => {
        if (event.url && event.url.length > 0) {
          const returnValue = extractTokenAndUserId(event.url);
          const userId: string = returnValue.userId;
          const token: string = returnValue.token;

          navigation.navigate('ChangePWD', {id: userId, token: token});
        }
      });
      if (!AppState.isAppLaunched) {
        // Detect deep-linking when the app not yet launched
        Linking.getInitialURL().then((url) => {
          if (url) {
            const returnValue = extractTokenAndUserId(url);
            const userId: string = returnValue.userId;
            const token: string = returnValue.token;

            navigation.navigate('ChangePWD', {id: userId, token: token});
          }
        });
      }
    }
    AppState.isAppLaunched = true;
    Object.freeze(AppState);
  }, [])

  useEffect(() => {
    if (isFocused && statusResponse.response && statusResponse.response.errorMsg === "Fetch failed") {
      dispatch(resetFetchStatus());
      setisLoading(false);
      Toast.show({
        type: 'error',
        text1: "???? Login Failed ????",
        text2: "Try again please."
      });
    }
  })

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
        checkEmail={checkEmail}
        checkPassword={checkPassword}
        goToForgetPWD={goToForgetPWD}
      />
    </>
  );
};
