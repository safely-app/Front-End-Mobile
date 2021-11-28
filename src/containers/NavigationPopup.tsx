import React, {useEffect, useState} from 'react';
import { useAppSelector, useAppDispatch } from '../utils/hooks';
import {NavigationPopupComponent} from '../components/index';
import { useRoute } from '@react-navigation/core';

export const NavigationPopup = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {credentials} = useAppSelector((state) => state.user);
  const route = useRoute();


  return (
    <>
      <NavigationPopup
      />
    </>
  );
};
