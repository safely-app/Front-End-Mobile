import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux/reducers';
import {ChangePWDComponent} from '../components/index';
import {useNavigation, useRoute} from '@react-navigation/native';
import {constraints} from '../utils/constraints';
import {validate} from 'validate.js';
import {userServices} from '../services';

// import {RootStackParamList} from '../redux/types';
// type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  // navigation: ProfileScreenNavigationProp,
}


export const ChangePWD: React.FC<Props> = () => {

    const route = useRoute();
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setisLoading] = useState(false);
    const navigation = useNavigation();

    function onSubmit(password: string) {
        const validateObj = validate({password: password}, constraints);
        const passwordErrorMsg = validateObj ? validateObj['password'] : undefined;

        setPasswordError(passwordErrorMsg);

        if (!passwordErrorMsg) {
          const userId = route.params.id;
          const token = route.params.token;

          setisLoading(true);
          userServices.changePassword(userId, token, password)
          .then((res) => {
            setisLoading(false);
            navigation.goBack();
          })
          .catch(err => {
            setisLoading(false);
            console.log('error');
            console.log(err);
          });
        }
      }

    function checkPassword(email: string) {
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
      />
    </>
  );
};