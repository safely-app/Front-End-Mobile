import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {logoutUser, getUser} from '../redux/actions/user.actions';
import {RootState} from '../redux/reducers';
import {HomeComponent} from '../components/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { failure } from '../redux';
import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { safeplaceServices } from '../services';
import { SafeplaceInterface } from '../../types/safeplace';

export const Home = (): JSX.Element => {

  const dispatch = useDispatch();
  const {credentials} = useSelector((state: RootState) => state.user);
  const [longitude, setLongitude] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);
  const [altitude, setAltitude] = useState<number>(0);
  const [safeplaces, setSafeplaces] = useState<SafeplaceInterface[]>([]);

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
      safeplaceServices.getSafeplace()
      .then((res) => {
        setSafeplaces(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
    }, []);

    useEffect(() => {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: "Safely App location permissions",
        message: "Safely needs access to your locations for the map to be working properly",
        buttonNegative: "No",
        buttonPositive: "Yes",
        buttonNeutral: "Later"
      })
      .then((res) => {
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        .then((res) => {
          Geolocation.getCurrentPosition(
            (position) => {
              console.log(position);
              if (position.coords.altitude) {
                setAltitude(position.coords.altitude);
              }
              setLongitude(position.coords.longitude);
              setLatitude(position.coords.latitude);
            },
            (error) => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 2000, maximumAge: 3600000 }
          );
        })
        .catch((err) => {
          console.log(err);
        });
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      })
    })

  return (
    <>
      <HomeComponent
        logout={logout}
        username={credentials.username}
        latitude={latitude}
        longitude={longitude}
        altitude={altitude}
        safeplaces={safeplaces}
      />
    </>
  );
};
