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
import {googleServices} from '../services';
import { useNavigation } from '@react-navigation/native';

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
  const [originInput, setOriginInput] = useState<string>('');
  const [originPlaces, setOriginPlaces] = useState<[]>([]);
  const [destinationPlaces, setDestinationPlaces] = useState<[]>([]);
  const [originFocus, setOriginFocus] = useState<boolean>(false);
  const [destinationFocus, setDestinationFocus] = useState<boolean>(false);
  const [destinationInput, setDestinationInput] = useState<string>("");
  const [navigationMode, setNavigationMode] = useState<boolean>(false);
  const navigation = useNavigation();

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

  const getOriginPlaces = (text: string, latitude: number, longitude: number, input: String) => {
    googleServices.getPlaces(text, latitude, longitude)
    .then((res) => {
      console.log(res.data);
      if (input === "origin") {
        setOriginPlaces(res.data.predictions);
      } else {
        setDestinationPlaces(res.data.predictions);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const setCoordsFromPlace = (address: string, type: string)  => {
    googleServices.getCoords(address)
    .then((res) => {
      if (type === "origin") {
        setOrigin({latitude: res.data.results[0].geometry.location.lat, longitude: res.data.results[0].geometry.location.lng});
      } else {
        setDestination({latitude: res.data.results[0].geometry.location.lat, longitude: res.data.results[0].geometry.location.lng});
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const goToSafeplace = (id: string) => {
    navigation.navigate('Safeplace', {id: id});
  }

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
        setOriginInput={setOriginInput}
        setDestinationInput={setDestinationInput}
        originInput={originInput}
        originPlaces={originPlaces}
        destinationInput={destinationInput}
        getOriginPlaces={getOriginPlaces}
        originFocus={originFocus}
        destinationFocus={destinationFocus}
        setOriginFocus={setOriginFocus}
        setDestinationFocus={setDestinationFocus}
        destinationPlaces={destinationPlaces}
        setCoordsFromPlace={setCoordsFromPlace}
        navigationMode={navigationMode}
        setNavigationMode={setNavigationMode}
        goToSafeplace={goToSafeplace}
        logout={logout}
      />
    </>
  );
};
