import React, {useEffect, useState} from 'react';
import {NavigationPopupComponent} from '../components/index';
import {directionsApiResponse, googleServices} from '../services'
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons'
import axios, { AxiosResponse } from 'axios';

interface Props {
  navigationSteps: []
  latitude: number
  longitude: number
  origin: {latitude: number, longitude: number}
  destination: {latitude: number, longitude: number}
}

export const NavigationPopup = ({navigationSteps, latitude, longitude, origin, destination}: Props): JSX.Element => {
  const [directionText, setDirectionText] = useState<string>("")
  const [metersText, setMetersText] = useState<string | undefined>("")
  const [startTime, setStartTime] = useState<number>(new Date().getTime())

  useEffect(() => {
    if (latitude == 0 || longitude == 0)
      return;

    if (new Date().getTime() - startTime > 5000){
      googleServices.getDirection(`${latitude},${longitude}`, `${destination.latitude},${destination.longitude}`)
      .then((res: AxiosResponse<directionsApiResponse>) => {
          const directions: directionsApiResponse = res.data;
          setDirectionText(directions.routes[0].legs[0].steps[0].html_instructions)
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
        setDirectionText(directions.routes[0].legs[0].steps[0].html_instructions)
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
