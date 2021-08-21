import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {logoutUser, getUser} from '../redux/actions/user.actions';
import {RootState} from '../redux/reducers';
import {HomeComponent} from '../components/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { failure } from '../redux';

export const Home = ({}: {}): JSX.Element => {

  const dispatch = useDispatch();
  const {credentials} = useSelector((state: RootState) => state.user);


    const logout = async () => {
        try {
            dispatch(logoutUser());
            await AsyncStorage.removeItem('persist:root');
        } catch {
            dispatch(failure());
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
