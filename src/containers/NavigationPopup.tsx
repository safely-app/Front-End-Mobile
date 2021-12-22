import React, {useEffect, useState} from 'react';
import {NavigationPopupComponent} from '../components/index';
import {googleServices} from '../services'
import { directionsApiResponse } from '../../types/googleServices';
import { AxiosResponse } from 'axios';
import { isPointWithinRadius } from 'geolib'
import Toast from 'react-native-toast-message';

interface Props {
  latitude: number
  longitude: number
  origin: {latitude: number, longitude: number}
  destination: {latitude: number, longitude: number}
  setNavigationMode: (bool: boolean) => void;
}

export const NavigationPopup = ({setNavigationMode, latitude, longitude, origin, destination}: Props): JSX.Element => {
  const [directionText, setDirectionText] = useState<string>("")
  const [metersText, setMetersText] = useState<string | undefined>("")
  const [startTime, setStartTime] = useState<number>(new Date().getTime())
  const [isFinished, setIsFinished] = useState<boolean>(false)

  useEffect(() => {
    if (latitude == 0 || longitude == 0)
      return;

    if (isFinished) {
      setNavigationMode(false)
      Toast.show({
        type: 'success',
        text1: "Vous êtes arrivé à destination !",
      });
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
    if (latitude == 0 || longitude == 0)
      return;
    
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
  }, [])

  return (
    <>
      <NavigationPopupComponent
        directionText={directionText}
        metersText={metersText}
      />
    </>
  );
};
