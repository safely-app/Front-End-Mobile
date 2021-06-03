import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux/reducers';
import {ProfileComponent} from '../components/index';
import {constraints} from '../utils/constraints';
import validate from 'validate.js';
import {userServices} from '../services';
import {resetFetch, getUser, logoutUser} from '../redux/actions';
// import {RootStackParamList} from '../redux/types';
// type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  // navigation: ProfileScreenNavigationProp,
}


export const Profile: React.FC<Props> = () => {

  const dispatch = useDispatch();
  const {error} = useSelector((state: RootState) => state.common);
  const {credentials} = useSelector((state: RootState) => state.user);
  const [email, setEmail] = useState(credentials.email);
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [isLoading, setisLoading] = useState(false);

  function onSubmit(email: string, password: string) {
    const validateObj = validate({emailAddress: email}, constraints);
    const emailErrorMsg = validateObj ? validateObj['emailAddress'] : undefined;
    const passwordErrorMsg = password.length < 3 && password.length != 0 ? "Your password is too short" : undefined;

    setEmailError(emailErrorMsg);
    setPasswordError(passwordErrorMsg);

    if (password.length > 0 && confirmPassword !== password) {
      return;
    }

    if (password.length <= 0 && confirmPassword.length > 0) {
      return;
    }

    if (!emailErrorMsg && !passwordErrorMsg) {
      setisLoading(true);
      userServices.updateUser(credentials._id, credentials.token, email, password)
      .then(res => {
        // setisLoading(false);
        dispatch(getUser(credentials._id, credentials.token));
      })
      .catch(err => {
        console.log('err');
        console.log(err);
      })
    }
  }

  function checkPassword(password: string) {
    if (password.length < 3) {
      setPasswordError("Your password is too short");
    } else {
      setPasswordError('');
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

  useEffect(() => {
    if (Object.keys(error).length > 0) {
      dispatch(resetFetch());
      setisLoading(false);
    }
  })

  function onDelete() {
    userServices.deleteUser(credentials.token, credentials._id)
    .then((res) => {
      dispatch(logoutUser());
      AsyncStorage.removeItem('persist:root');
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <>
      <ProfileComponent
        email={email}
        setEmail={setEmail}
        checkEmail={checkEmail}
        isLoading={isLoading}
        onSubmit={onSubmit}
        emailError={emailError}
        password={password}
        passwordError={passwordError}
        checkPassword={checkPassword}
        setPassword={setPassword}
        onDelete={onDelete}
        confirmPassword={confirmPassword}
        setconfirmPassword={setconfirmPassword}
      />
    </>
  );
};
