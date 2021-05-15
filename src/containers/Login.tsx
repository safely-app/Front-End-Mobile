import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {loginUser} from '../redux/actions/user.actions';
import {RootState} from '../redux/reducers';
import {LoginComponent} from '../components/index';
import {useNavigation} from '@react-navigation/native';
import {validate} from 'validate.js';
// import {StackNavigationProp} from '@react-navigation/stack';
// import {RootStackParamList} from '../redux/types';
// type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export const constraints = {
  emailAddress: {
    presence: {
      allowEmpty: false,
      message: "^Please enter an email address"
    },
    email: {
      message: "^Please enter a valid email address"
    }
  },
  password: {
    presence: {
      allowEmpty: false,
      message: "^Please enter a password"
    },
    length: {
      minimum: 4,
      message: 'Your password is too short'
    }
  }
};

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
      // dispatch(loginUser({username, password}));
      // setisLoading(true);
      console.log('Success Validation !');
    }
  }

  function goToRegister() {
    navigation.navigate('Register');
  }

  useEffect(() => {
    if (credentials.token) {
      console.warn('Logged In');
    } else if (credentials.token === undefined) {
      console.warn('Wrong credentials, try again.');
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
      />
    </>
  );
};
