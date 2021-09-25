import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {logoutUser, getUser} from '../redux/actions/user.actions';
import {RootState} from '../redux/reducers';
import {HomeComponent} from '../components/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { failure } from '../redux';
import { safeplaceServices } from '../services';
import { SafeplaceInterface } from '../../types/safeplace';
import { LatLng } from 'react-native-maps';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';

export const Home = (): JSX.Element => {

  const dispatch = useDispatch();
  const {credentials} = useSelector((state: RootState) => state.user);
  const [longitude, setLongitude] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);
  const [permissions, setPermissions] = useState<boolean>(false);
  const [safeplaces, setSafeplaces] = useState<SafeplaceInterface[]>([]);
  const [origin, setOrigin] = useState<LatLng>({latitude: 0, longitude: 0});
  const [destination, setDestination] = useState<LatLng>({latitude: 0, longitude: 0});
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);

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
      // Toast.show({
      //   type: 'success',
      //   text1: "Success login",
      // });
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
    let unsubscribeLocation = (async (): Promise<{ remove(): void }> => {
      // Get permissions of location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('not granted');
        throw "not granted";
      } else {
        // Setting callback to get location when user moves
        setPermissions(true);
        return await Location.watchPositionAsync({
          accuracy: LocationAccuracy.BestForNavigation,
          timeInterval: 0,
          distanceInterval: 0
        }, (location) => {
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
        })
      }
    })();

    return (() => {
      // unsubscribeLocation is called when the component is unmounted
      // it will call the remove function to remove the callback of watchPositionAsync
      unsubscribeLocation
      .then((res) => {
        res.remove();
      })
    })
  }, [])

  return (
    <>
      <HomeComponent
        latitude={latitude}
        longitude={longitude}
        safeplaces={safeplaces}
        permissions={permissions}
        origin={origin}
        destination={destination}
        setOrigin={setOrigin}
        setDestination={setDestination}
        isMapLoaded={isMapLoaded}
        setIsMapLoaded={setIsMapLoaded}
      />
    </>
  );
};
