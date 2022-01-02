import React, {useEffect, useState} from 'react';
import { useRoute, useIsFocused } from '@react-navigation/core';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux/reducers';
import {HomeComponent} from '../components/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { safeplaceServices } from '../services';
import { SafeplaceInterface } from '../../types/safeplace';
import { LatLng } from 'react-native-maps';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';
import {googleServices} from '../services';
import { useNavigation } from '@react-navigation/native';
import { getUser } from '../redux';

export const Home = (): JSX.Element => {

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const route = useRoute();
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
  const [birdNearestPlaces, setBirdNearestPlaces] = useState<[]>([]);
  const [originFocus, setOriginFocus] = useState<boolean>(false);
  const [destinationFocus, setDestinationFocus] = useState<boolean>(false);
  const [destinationInput, setDestinationInput] = useState<string>("");
  const [navigationMode, setNavigationMode] = useState<boolean>(false);
  const [isNearbyPanelActive, setIsNearbyPanelActive] = useState(true);
  const navigation = useNavigation();
  const [count, setCount] = useState<number>(0);

  const hours: number = 24
  const cacheExpiryTime = new Date()
  cacheExpiryTime.setHours(cacheExpiryTime.getHours() + hours)

  useEffect(() => {

    setIsNearbyPanelActive(true);

    if (isFocused) {
      if (route.params !== undefined) {
        googleServices.getReverseCoords(latitude, longitude)
        .then((res) => {
          setCoordsFromPlace(route.params.address, 'destination');
          setDestinationInput(route.params.address);
          setOriginInput(res.data.results[0].formatted_address);
          setOrigin({latitude: latitude, longitude: longitude});
        })
        .catch((err) => {
          throw err;  
        })
      }
    }
  }, [isFocused])

  useEffect(() => {
    if (latitude !== 0 && longitude !== 0) {
      safeplaceServices
        .getSafeplaceBirdNearest(latitude, longitude, 10, credentials.token)
        .then(res => setBirdNearestPlaces(res.data.nearest))
        .catch(err => console.error(err));
    }
  }, [isNearbyPanelActive, latitude, longitude]);

  useEffect(() => {
    if (!credentials.username || (credentials.username && credentials.username.length <= 0)) {
      // console.log('abc');
      dispatch(getUser({userId: credentials._id, token: credentials.token}));
    }

    const lastrequestFunction = async () => {
      const lastrequest = await AsyncStorage.getItem("lastSafeplaceRequest");

      if (lastrequest == null || new Date(JSON.parse(lastrequest)) > cacheExpiryTime) {
        safeplaceServices.getSafeplace(credentials.token)
        .then((res) => {
          // setSafeplaces(res.data);
          AsyncStorage.setItem("lastSafeplaceRequest", JSON.stringify(new Date()));
          AsyncStorage.setItem("safeplaces", JSON.stringify(res.data));
        })
        .catch((err) => {
          console.log(err);
        })
      }
    }

    lastrequestFunction();

    AsyncStorage.getItem("safeplaces")
    .then((res) => {
      setSafeplaces(JSON.parse(res));
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

      // Setting all the state at null to avoid memory leak and unmounted components
      setLongitude(0);
      setLatitude(0);
      setPermissions(false);
      // setSafeplaces([]);
      setOrigin({latitude: 0, longitude: 0});
      setDestination({latitude: 0, longitude: 0});
      setOriginInput("");
      setOriginPlaces([]);
      setDestinationPlaces([]);
      setOriginFocus(false);
      setDestinationFocus(false);
      setDestinationInput("");
      setNavigationMode(false);
      setIsMapLoaded(false);
      setBirdNearestPlaces([]);
      setIsNearbyPanelActive(true);
      setCount(0);
    })
  }, [])

  const getOriginPlaces = (text: string, latitude: number, longitude: number, input: String) => {
    googleServices.getPlaces(text, latitude, longitude)
    .then((res) => {
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

  const getNearestSafe = () => {
    safeplaceServices.getSafeplaceNearest(latitude, longitude, credentials.token)
    .then((res) => {
      googleServices.getReverseCoords(res.data.nearest.latitude, res.data.nearest.longitude)
      .then((res) => {
        setCoordsFromPlace(res.data.results[0].formatted_address, "destination");
        setDestinationInput(res.data.results[0].formatted_address);
        googleServices.getReverseCoords(latitude, longitude)
        .then((res) => {
          setCoordsFromPlace(res.data.results[0].formatted_address, "origin");
          setOriginInput(res.data.results[0].formatted_address);
        })
        .catch((err) => {
          console.log(err);
          throw err;
        })
      })
      .catch((err) => {
        throw err;
      })
    })
    .catch((err) => {
      throw err;
    })
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
        count={count}
        setCount={setCount}
        getNearestSafe={getNearestSafe}
        birdNearestPlaces={birdNearestPlaces}
        isNearbyPanelActive={isNearbyPanelActive}
        setIsNearbyPanelActive={setIsNearbyPanelActive}
      />
    </>
  );
};
