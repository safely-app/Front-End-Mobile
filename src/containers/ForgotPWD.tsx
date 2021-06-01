import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {loginUser} from '../redux/actions/user.actions';
import {RootState} from '../redux/reducers';
import {ForgotPWDComponent} from '../components/index';
import {useNavigation} from '@react-navigation/native';
import {constraints} from '../utils/constraints';
import { FastField } from 'formik';
import {validate} from 'validate.js';
import { Linking, Platform } from 'react-native';
import {userServices} from '../services';
// import {RootStackParamList} from '../redux/types';
// type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  // navigation: ProfileScreenNavigationProp,
}


export const ForgotPWD: React.FC<Props> = () => {

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const navigation = useNavigation();


  function onSubmit(email: string) {
    const validateObj = validate({emailAddress: email}, constraints);
    const emailErrorMsg = validateObj ? validateObj['emailAddress'] : undefined;

    setEmailError(emailErrorMsg);

    if (!emailErrorMsg) {
      setisLoading(true);
      userServices.forgotPassword(email)
      .then(res => {
        console.log(res);
        setisLoading(false);
        navigation.goBack();
      })
      .catch(err => {
        setisLoading(false);
        console.warn('Email doesn\'t exist');
        console.log(err);
      })
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

  return (
    <>
      <ForgotPWDComponent
        checkEmail={checkEmail}
        onSubmit={onSubmit}
        setEmail={setEmail}
        email={email}
        emailError={emailError}
        isLoading={isLoading}
      />
    </>
  );
};
