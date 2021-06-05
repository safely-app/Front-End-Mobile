import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {loginUser} from '../redux/actions/user.actions';
import {resetFetch} from '../redux/actions/common.actions';
import {RootState} from '../redux/reducers';
import {LoginComponent} from '../components/index';
import {useNavigation} from '@react-navigation/native';
import {validate} from 'validate.js';
import {constraints} from '../utils/constraints';
import {Linking, Platform} from 'react-native';
import {extractTokenAndUserId} from '../utils/utils';
// import {StackNavigationProp} from '@react-navigation/stack';
// import {RootStackParamList} from '../routes';
// type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
import {AppState} from '../utils/isAppLaunched';

interface Props {
  // navigation: ProfileScreenNavigationProp,
}

export const Login: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const {error} = useSelector((state: RootState) => state.common);
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


    if (!emailErrorMsg && !passwordErrorMsg) {
      setisLoading(true);
      dispatch(loginUser({username, password}));
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
          let userId: string;
          let token: string;
          let returnValue = extractTokenAndUserId(event.url);

          userId = returnValue.userId;
          token = returnValue.token;
          navigation.navigate('ChangePWD', {id: userId, token: token});
        }
      });
      if (!AppState.isAppLaunched) {
        // Detect deep-linking when the app not yet launched
        Linking.getInitialURL().then((url) => {
          if (url) {
            let userId: string;
            let token: string;
            let returnValue = extractTokenAndUserId(url);

            userId = returnValue.userId;
            token = returnValue.token;
            navigation.navigate('ChangePWD', {id: userId, token: token});
          }
        });
      }
    }
    AppState.isAppLaunched = true;
    Object.freeze(AppState);
  }, [])

  useEffect(() => {
    if (Object.keys(error).length > 0) {
      dispatch(resetFetch());
      setisLoading(false);
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
