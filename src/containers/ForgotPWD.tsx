import React, {useState} from 'react';
import {ForgotPWDComponent} from '../components/index';
import {useNavigation} from '@react-navigation/native';
import {constraints} from '../utils/constraints';
import {validate} from 'validate.js';
import {userServices} from '../services';
// import {RootStackParamList} from '../redux/types';
// type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  // navigation: ProfileScreenNavigationProp,
}


export const ForgotPWD: React.FC<Props> = () => {

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
      .then(res => {
        setisLoading(false);
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
