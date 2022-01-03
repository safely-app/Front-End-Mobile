import React, {useEffect, useState} from 'react';
import {NavigationPopupComponent} from '../components/index';
import {googleServices, safeplaceServices} from '../services'
import { directionsApiResponse } from '../../types/googleServices';
import { AxiosResponse } from 'axios';
import { isPointWithinRadius } from 'geolib';
import Toast from 'react-native-toast-message';
import { State } from '../../types/general';
import { Animated } from 'react-native';
import {useSelector} from 'react-redux';

interface Props {
  latitude: number;
  longitude: number;
  destination: {latitude: number, longitude: number};
  mapState: {
    value: number,
    setter: (val: State) => void;
  };
  waypoints: {
    value: [{latitude: number, longitude: number}],
    setter: (val: [{latitude: number, longitude: number}]) => void
  };
}

export const NavigationPopup = ({latitude, longitude, destination, mapState, waypoints}: Props): JSX.Element => {
  const [directionText, setDirectionText] = useState<string>("")
  const [metersText, setMetersText] = useState<string | undefined>("")
  const [startTime, setStartTime] = useState<number>(new Date().getTime())
  const [isFinished, setIsFinished] = useState<boolean>(false)
  const [valueAnim, setValueAnim] = useState(new Animated.Value(-155));
  const {credentials} = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if ((latitude == 0 || longitude == 0) || (destination.latitude === 0 && destination.longitude === 0) || mapState.value !== State.NAVIGATION)
      return;

    if (isFinished) {
      mapState.setter(State.MAP)
      Toast.show({
        type: 'success',
        text1: "Vous êtes arrivé à destination !",
      });
      setIsFinished(false);
    }

    if (isPointWithinRadius({latitude: latitude, longitude: longitude}, {latitude: destination.latitude, longitude: destination.longitude}, 70)) {
      setIsFinished(true)
    }
    if (new Date().getTime() - startTime > 5000){
      googleServices.getDirection(`${latitude},${longitude}`, `${destination.latitude},${destination.longitude}`)
      .then((res: AxiosResponse<directionsApiResponse>) => {
          const directions: directionsApiResponse = res.data;
          const cssHtml = `
            <head>
              <style type="text/css">
                @font-face {
                  font-family: 'WorkSans-Regular';
                  src: url('WorkSans-Regular.ttf')
                }
              </style>
            </head>
            <body>
          `
          setDirectionText(cssHtml + `<p style='font-family:WorkSans-Regular;font-size: 50'>` + directions.routes[0].legs[0].steps[0].html_instructions + '</p></body>')

          setMetersText(directions.routes[0].legs[0].steps[0].distance?.text)
      })
      setStartTime(new Date().getTime())
    }
  }, [latitude, longitude])

  useEffect(() => {
    if ((latitude == 0 || longitude == 0) || (destination.latitude === 0 && destination.longitude === 0))
      return;

    safeplaceServices.getWaypoints({latitude: latitude, longitude: longitude}, destination, credentials.token)
    .then((res) => {
      let arrayWaypoints: [{latitude: number, longitude: number}] = [];
      Object.keys(res).forEach((index) => {
        arrayWaypoints.push({latitude: Number(res[index].latitude), longitude: Number(res[index].longitude)})
      })
      waypoints.setter(arrayWaypoints);
    })
    
    googleServices.getDirection(`${latitude},${longitude}`, `${destination.latitude},${destination.longitude}`)
    .then((res: AxiosResponse<directionsApiResponse>) => {
        const directions: directionsApiResponse = res.data;

        if (!directions || !directions.routes[0] || !directions.routes || !directions.routes[0])
          return;
        const cssHtml = `
          <head>
            <style type="text/css">
              @font-face {
                font-family: 'WorkSans-Regular';
                src: url('WorkSans-Regular.ttf')
              }
            </style>
          </head>
          <body>
        `
        setDirectionText(cssHtml + `<p style='font-family:WorkSans-Regular;font-size: 50'>` + directions.routes[0].legs[0].steps[0].html_instructions + '</p></body>')
        setMetersText(directions.routes[0].legs[0].steps[0].distance?.text)
    })
  }, [destination])

  useEffect(() => {
    if (mapState.value === State.NAVIGATION) {
      Animated.spring(valueAnim, {
        toValue: 50,
        friction: 10,
        useNativeDriver: true
      }).start();
    } else if (mapState.value === State.MAP) {
      Animated.spring(valueAnim, {
        toValue: -155,
        friction: 10,
        useNativeDriver: true
      }).start();
    }
  }, [mapState])

  return (
    <>
      <NavigationPopupComponent
        directionText={directionText}
        metersText={metersText}
        valueAnim={valueAnim}
      />
    </>
  );
};
