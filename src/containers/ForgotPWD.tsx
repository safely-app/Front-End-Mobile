import React, {useState} from 'react';
import {ForgotPWDComponent} from '../components/index';
import {useNavigation} from '@react-navigation/native';
import {constraints} from '../utils/constraints';
import {validate} from 'validate.js';
import {userServices} from '../services';
import Toast from 'react-native-toast-message';

export const ForgotPWD = (): JSX.Element => {

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string>('');
  const [isLoading, setisLoading] = useState<boolean>(false);
  const navigation = useNavigation();


  function onSubmit(email: string) {
    const validateObj = validate({emailAddress: email}, constraints);
    const emailErrorMsg = validateObj ? validateObj['emailAddress'] : undefined;

    setEmailError(emailErrorMsg);

    if (!emailErrorMsg) {
      setisLoading(true);
      userServices.forgotPassword(email)
      .then(() => {
        setisLoading(false);
        Toast.show({
          type: 'success',
          text1: "Your mail has been sent!",
        });
        navigation.goBack();
      })
      .catch(err => {
        setisLoading(false);
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
