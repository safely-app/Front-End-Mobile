import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {logoutUser, getUser} from '../redux/actions/user.actions';
import {RootState} from '../redux/reducers';
import {HomeComponent} from '../components/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
// import {RootStackParamList} from '../redux/types';
// type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  // navigation: ProfileScreenNavigationProp,
}


export const Home: React.FC<Props> = () => {

  const dispatch = useDispatch();
  const {credentials} = useSelector((state: RootState) => state.user);


    const logout = async () => {
        try {
            dispatch(logoutUser());
            await AsyncStorage.removeItem('persist:root');
        } catch {

        }
    }

    useEffect(() => {
      if (!credentials.username || (credentials.username && credentials.username.length <= 0)) {
        dispatch(getUser(credentials._id, credentials.token));
        Toast.show({
          type: 'success',
          text1: "Success login",
        });
      }
    }, []);
  return (
    <>
      <HomeComponent
        logout={logout}
        username={credentials.username}
      />
    </>
  );
};
