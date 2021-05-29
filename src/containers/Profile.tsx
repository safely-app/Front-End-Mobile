import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {loginUser} from '../redux/actions/user.actions';
import {RootState} from '../redux/reducers';
import {ProfileComponent} from '../components/index';
import {useNavigation} from '@react-navigation/native';
import {constraints} from '../utils/constraints';
import { FastField } from 'formik';
// import {RootStackParamList} from '../redux/types';
// type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  // navigation: ProfileScreenNavigationProp,
}


export const Profile: React.FC<Props> = () => {

  return (
    <>
      <ProfileComponent
      />
    </>
  );
};
