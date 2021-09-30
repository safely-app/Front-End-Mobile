import axios from 'react-native-axios';
import {GOOGLE_API_KEY} from '@env'

async function getPlaces(input: String, latitude: Number, longitude: Number): Promise<[]> {
    if (latitude !== 0 && longitude !== 0) {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GOOGLE_API_KEY}&input=${input}&location=${latitude}, ${longitude}&radius=2000`, {headers: {"Content-type": "application/json"}});

        return response;
    } else {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GOOGLE_API_KEY}&input=${input}&radius=2000`, {headers: {"Content-type": "application/json"}});

        return response;
    }
    
}

async function getCoords(input: String): Promise<[]> {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE_API_KEY}&address=${input}&sensor=false`, {headers: {"Content-type": "application/json"}});

    return response;
}

async function getReverseCoords(latitude: string, longitude: string): Promise<void> {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`, {headers: {"Content-type": "application/json"}});    

    return response;
}

export const googleServices = {
    getPlaces,
    getCoords,
    getReverseCoords
}