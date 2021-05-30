import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {loginUser} from '../redux/actions/user.actions';
import {RootState} from '../redux/reducers';
import {ChangePWDComponent} from '../components/index';
import {useNavigation, useRoute} from '@react-navigation/native';
import {constraints} from '../utils/constraints';
import {validate} from 'validate.js';

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

    function onSubmit(password: string) {
        const validateObj = validate({password: password}, constraints);
        const passwordErrorMsg = validateObj ? validateObj['password'] : undefined;
    
        setPasswordError(passwordErrorMsg);
    
    
        if (!passwordErrorMsg) {
          // ChangePWD
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


    useEffect(() => {
        console.log(route.params);
        console.log(password);
    })
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
