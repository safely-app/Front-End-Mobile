import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {logoutUser, getUser} from '../redux/actions/user.actions';
import {RootState} from '../redux/reducers';
import {HomeComponent} from '../components/index';
import {useNavigation} from '@react-navigation/native';
import {constraints} from '../utils/constraints';
import { FastField } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
      console.log(credentials);
      if (!credentials.username || (credentials.username && credentials.username.length <= 0))
        dispatch(getUser(credentials._id, credentials.token));
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
