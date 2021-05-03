import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {loginUser} from '../redux/actions/user.actions';
import {RootState} from '../redux/reducers';
import {LoginComponent} from '../components/index';
// import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
// import {RootStackParamList} from '../redux/types';

// type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  // navigation: ProfileScreenNavigationProp,
}

export const Login: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const {credentials} = useSelector((state: RootState) => state.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const navigation = useNavigation();


  function onLogin(username: string, password: string) {
    dispatch(loginUser({username, password}));
    setisLoading(true);
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
      />
    </>
  );
};
