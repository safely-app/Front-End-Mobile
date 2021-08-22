import React, {useEffect} from 'react';
import { useAppSelector, useAppDispatch } from '../utils/hooks';
import {logoutUser, getUser, resetFetchStatus} from '../redux';
import {HomeComponent} from '../components/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export const Home = (): JSX.Element => {

  const dispatch = useAppDispatch();
  const {credentials} = useAppSelector((state) => state.user);

    const logout = async () => {
        try {
            dispatch(logoutUser());
            await AsyncStorage.removeItem('persist:root');
        } catch {
            console.log('logout failed');
        }
    }

    useEffect(() => {
      if (!credentials.username || (credentials.username && credentials.username.length <= 0)) {
        dispatch(resetFetchStatus());     
        dispatch(getUser({userId: credentials._id, token: credentials.token}));
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
