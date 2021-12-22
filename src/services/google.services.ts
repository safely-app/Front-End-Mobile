import axios, { AxiosResponse } from 'axios';
import {GOOGLE_API_KEY} from '@env'
import {directionsApiResponse, geocodeApiResponse, placesAutocompletesApiResponse} from '../../types/googleServices'

async function getPlaces(input: string, latitude: Number, longitude: Number): Promise<AxiosResponse<placesAutocompletesApiResponse>> {
    if (latitude !== 0 && longitude !== 0) {
        const response: AxiosResponse<placesAutocompletesApiResponse> = await axios.get<placesAutocompletesApiResponse>(`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GOOGLE_API_KEY}&input=${input}&location=${latitude}, ${longitude}&radius=2000`, {headers: {"Content-type": "application/json"}});
                     
        return response;
    } else {
        const response: AxiosResponse<placesAutocompletesApiResponse> = await axios.get<placesAutocompletesApiResponse>(`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GOOGLE_API_KEY}&input=${input}&radius=2000`, {headers: {"Content-type": "application/json"}});

        return response;
    }
}

async function getCoords(input: string): Promise<AxiosResponse<geocodeApiResponse>> {
    const response: AxiosResponse<geocodeApiResponse> = await axios.get<geocodeApiResponse>(`https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE_API_KEY}&address=${input}&sensor=false`, {headers: {"Content-type": "application/json"}});
      
    return response;
}

async function getReverseCoords(latitude: string, longitude: string): Promise<AxiosResponse<geocodeApiResponse>> {
    const response: AxiosResponse<geocodeApiResponse> = await axios.get<geocodeApiResponse>(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`, {headers: {"Content-type": "application/json"}});    
     
    return response;
}

async function getDirection(origin: string, destination: string): Promise<AxiosResponse<directionsApiResponse>> {
    const response: AxiosResponse<directionsApiResponse> = await axios.get<directionsApiResponse>(`https://maps.googleapis.com/maps/api/directions/json?key=${GOOGLE_API_KEY}&origin=${origin}&destination=${destination}&language=fr&mode=walking`, {headers: {"Content-type": "application/json"}});
     
    return response;
}

export const googleServices = {
    getPlaces,
    getCoords,
    getReverseCoords,
    getDirection
}