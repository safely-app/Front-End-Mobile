import React, {useState} from 'react';
import {ChangePWDComponent} from '../components/index';
import {useNavigation, useRoute} from '@react-navigation/native';
import {constraints} from '../utils/constraints';
import {validate} from 'validate.js';
import {userServices} from '../services';

export const ChangePWD = ({}: {}): JSX.Element => {

    const route = useRoute();
    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [confirmPassword, setconfirmPassword] = useState<string>('');
    const [isLoading, setisLoading] = useState<boolean>(false);
    const navigation = useNavigation();

    function onSubmit(password: string) {
        const validateObj = validate({password: password}, constraints);
        const passwordErrorMsg = validateObj ? validateObj['password'] : undefined;

        setPasswordError(passwordErrorMsg);

        if (!passwordErrorMsg && (confirmPassword === password)) {
          const userId = route.params.id;
          const token = route.params.token;

          setisLoading(true);
          userServices.changePassword(userId, token, password)
          .then(() => {
            setisLoading(false);
            navigation.goBack();
          })
          .catch(err => {
            setisLoading(false);
            console.log(err);
          });
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

  return (
    <>
      <ChangePWDComponent
        password={password}
        setPassword={setPassword}
        passwordError={passwordError}
        isLoading={isLoading}
        checkPassword={checkPassword}
        onSubmit={onSubmit}
        confirmPassword={confirmPassword}
        setconfirmPassword={setconfirmPassword}
      />
    </>
  );
};
