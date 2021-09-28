import React, {useState} from 'react';
import { useAppSelector, useAppDispatch } from '../utils/hooks';
import {ProfileComponent} from '../components/index';
import {constraints} from '../utils/constraints';
import validate from 'validate.js';
import {userServices} from '../services';
import {getUser, logoutUser} from '../redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export const Profile = (): JSX.Element => {

  const dispatch = useAppDispatch();
  const {credentials} = useAppSelector((state) => state.user);
  const [email, setEmail] = useState<string>(credentials.email);
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string | undefined>(undefined);
  const [confirmPassword, setconfirmPassword] = useState<string>('');
  const [isLoading, setisLoading] = useState<boolean>(false);

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
      .then(() => {
        Toast.show({
          type: 'success',
          text1: "Your modification has been applied",
        });        
        dispatch(getUser({userId: credentials._id, token: credentials.token}));
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

  function onDelete() {
    userServices.deleteUser(credentials.token, credentials._id)
    .then(() => {
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
