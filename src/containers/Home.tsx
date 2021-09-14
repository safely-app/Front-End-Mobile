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
import RNLocation, { Subscription } from 'react-native-location';
import { useNavigation } from '@react-navigation/core';
import { LatLng } from 'react-native-maps';

RNLocation.configure({
  distanceFilter: 1, // Meters
  desiredAccuracy: {
    ios: "best",
    android: "balancedPowerAccuracy"
  },
  // Android only
  androidProvider: "auto",
  interval: 5000, // Milliseconds
  fastestInterval: 10000, // Milliseconds
  maxWaitTime: 5000, // Milliseconds
  // iOS Only
  activityType: "other",
  allowsBackgroundLocationUpdates: false,
  headingFilter: 1, // Degrees
  headingOrientation: "portrait",
  pausesLocationUpdatesAutomatically: false,
  showsBackgroundLocationIndicator: false,
})
export const Home = (): JSX.Element => {

  const dispatch = useDispatch();
  const {credentials} = useSelector((state: RootState) => state.user);
  const [longitude, setLongitude] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);
  const [altitude, setAltitude] = useState<number>(0);
  const [permissions, setPermissions] = useState<boolean>(false);
  const [safeplaces, setSafeplaces] = useState<SafeplaceInterface[]>([]);
  const [origin, setOrigin] = useState<LatLng>({latitude: 0, longitude: 0});
  const [destination, setDestination] = useState<LatLng>({latitude: 0, longitude: 0});

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

    let unsubscribe: Subscription;
    useEffect(() => {
      RNLocation.requestPermission({
        ios: "whenInUse",
        android: {
          detail: "fine"
        }
      }).then(granted => {
          if (granted) {
            setPermissions(true);
            unsubscribe = RNLocation.subscribeToLocationUpdates(locations => {
              if (locations[0].altitude) {
                setAltitude(locations[0].altitude);
              }
              setLongitude(locations[0].longitude);
              setLatitude(locations[0].latitude);
            })
          }
        })

        return () => {
          if(unsubscribe)
            unsubscribe();
        }
    }, [])

  return (
    <>
      <HomeComponent
        logout={logout}
        username={credentials.username}
        latitude={latitude}
        longitude={longitude}
        altitude={altitude}
        safeplaces={safeplaces}
        permissions={permissions}
        origin={origin}
        destination={destination}
        setOrigin={setOrigin}
        setDestination={setDestination}
      />
    </>
  );
};
