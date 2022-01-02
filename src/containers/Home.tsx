import React, {useEffect, useState} from 'react';
import { useRoute, useIsFocused } from '@react-navigation/core';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux/reducers';
import {HomeComponent} from '../components/index';
import { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { safeplaceServices } from '../services';
import { SafeplaceInterface } from '../../types/safeplace';
import { LatLng } from 'react-native-maps';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';
import {googleServices} from '../services';
import { useNavigation } from '@react-navigation/native';
import { getUser } from '../redux';
import { State } from '../../types/general';
import { Animated } from 'react-native'

import { geocodeApiResponse, placesAutocompletesApiResponse, placesAutocompletesPrediction } from '../../types/googleServices';

export const Home = (): JSX.Element => {

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const route = useRoute();
  const navigation = useNavigation();
  const {credentials} = useSelector((state: RootState) => state.user);
  const [longitude, setLongitude] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);
  const [safeplaces, setSafeplaces] = useState<SafeplaceInterface[]>([]);
  const [origin, setOrigin] = useState<LatLng>({latitude: 0, longitude: 0});
  const [destination, setDestination] = useState<LatLng>({latitude: 0, longitude: 0});
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);
  const [originInput, setOriginInput] = useState<string>('');
  const [destinationInput, setDestinationInput] = useState<string>("");
  const [mapState, setMapState] = useState<State>(State.MAP);
  const [inputAnim, setInputAnim] = useState(new Animated.Value(-50))
  const [waypoints, setWaypoints] = useState<[{latitude: number, longitude: number}]>([]);
  // const [heading, setHeading] = useState<LocationHeadingObject>();

  const hours: number = 24
  const cacheExpiryTime = new Date()
  cacheExpiryTime.setHours(cacheExpiryTime.getHours() + hours)

  useEffect(() => {
    if (isFocused) {
      if (route.params !== undefined && route.params.address) {
        googleServices.getReverseCoords(latitude.toString(), longitude.toString())
        .then((res: AxiosResponse<geocodeApiResponse>) => {
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
    if (mapState === State.NAVIGATION) {
      Animated.spring(inputAnim, {
        toValue: -100,
        friction: 10,
        useNativeDriver: true
      }).start();
    }

    if (mapState === State.MAP) {
      Animated.spring(inputAnim, {
        toValue: 0,
        friction: 10,
        useNativeDriver: true
      }).start();
    }
  }, [mapState])

  // useEffect(() => {
  //   console.log(waypoints)
  // }, [waypoints])

  useEffect(() => {
    if (credentials.username.length <= 0) {
      dispatch(getUser({userId: credentials.id, token: credentials.token}));
    }

    const lastrequestFunction = async () => {
      const lastrequest = await AsyncStorage.getItem("lastSafeplaceRequest");

      if (lastrequest == null || new Date(JSON.parse(lastrequest)) > cacheExpiryTime) {
        safeplaceServices.getSafeplace(credentials.token)
        .then((res: AxiosResponse<SafeplaceInterface[]>) => {
          AsyncStorage.setItem("lastSafeplaceRequest", JSON.stringify(new Date()));
          AsyncStorage.setItem("safeplaces", JSON.stringify(res.data));
          AsyncStorage.getItem("safeplaces")
          .then((res2) => {
            setSafeplaces(JSON.parse(res2));
          })
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
        throw "not granted";
      } else {
        // Setting callback to get location when user moves
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
      setOrigin({latitude: 0, longitude: 0});
      setDestination({latitude: 0, longitude: 0});
      setOriginInput("");
      setDestinationInput("");
    })
  }, [])

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

  const goToInputAddress = (inputToModify: string) => {
    navigation.navigate('InputAddress', { 
      latitude: latitude,
      longitude: longitude,
      mapState: {setter: setMapState},
      routingInputs: {
        origin: { value: originInput, setter: setOriginInput },
        destination: { value: destinationInput, setter: setDestinationInput }
      },
      routingCoordinates: {
        origin: { latitude: origin.latitude, longitude: origin.longitude, setter: setOrigin },
        destination: { latitude: destination.latitude, longitude: destination.longitude, setter: setDestination }
      },
      inputToModify: inputToModify
    });
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
          setMapState(State.CONFIRMROUTE)
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

  const clearRouting = () => {
    setOrigin({ latitude: 0, longitude: 0 });
    setDestination({ latitude: 0, longitude: 0 });

    setOriginInput('');
    setDestinationInput('');
  }

  return (
    <>
      <HomeComponent
        latitude={latitude}
        longitude={longitude}
        safeplaces={safeplaces}
        isMapLoaded={isMapLoaded}
        setIsMapLoaded={setIsMapLoaded}
        goToSafeplace={goToSafeplace}
        getNearestSafe={getNearestSafe}
        goToInputAddress={goToInputAddress}
        routingCoordinates={{
          origin: { latitude: origin.latitude, longitude: origin.longitude, setter: setOrigin },
          destination: { latitude: destination.latitude, longitude: destination.longitude, setter: setDestination }
        }}
        routingInputs={{
          origin: { value: originInput, setter: setOriginInput },
          destination: { value: destinationInput, setter: setDestinationInput }
        }}
        mapState={{
          value: mapState,
          setter: setMapState
        }}
        inputAnim={inputAnim}
        clearRouting={clearRouting}
        waypoints={{
          value: waypoints,
          setter: setWaypoints
        }}
      />
    </>
  );
};
