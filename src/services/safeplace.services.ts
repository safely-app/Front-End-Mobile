import axios from 'react-native-axios';
import {SafeplaceInterface} from '../../types/safeplace';
import {API_URL} from '@env';

async function getSafeplace(): Promise<SafeplaceInterface[]> {
    const response = await axios.get(API_URL + `/safeplace/safeplace`, {headers: {"Content-type": "application/json"}});
     
    return response;
}

async function getSafeplaceId(id: string): Promise<SafeplaceInterface[]> {
    const response = await axios.get(API_URL + `/safeplace/safeplace/${id}`, {headers: {"Content-type": "application/json"}});
  
    return response;
}

async function setCommentSafeplace(comment: string, idSafeplace: string, idUser: string, grade: number, token: string): Promise<void> {
    
    const response = await axios.post(API_URL + '/safeplace/comment', {userId: idUser, safeplaceId: idSafeplace, comment: comment, grade: grade.toString()});

    return response;
}

async function getCommentSafeplace(): Promise<SafeplaceInterface[]> {
    const response = await axios.get(API_URL + `/safeplace/comment`, {headers: {"Content-type": "application/json"}});

    return response;
}

async function getRecurringPlaces(token: string): Promise<void> {
    const response = await axios.get(API_URL + `/safeplace/recurring`, {headers: {"Content-type": "application/json", Authorization: 'Bearer ' + token}});
  
    return response;
}

async function deleteRecurringPlace(idPlace: string): Promise<void> {
    const response = await axios.delete(API_URL + `/safeplace/recurring/${idPlace}`, {headers: {"Content-type": "application/json"}});
  
    return response;
}

async function editRecurringPlace(idPlace: string, name: string, address: string, city: string, coordinate: Array<string>, token: string): Promise<void> {
    const response = await axios.put(API_URL + `/safeplace/recurring/${idPlace}`,{
        name: name,
        address: address,
        city: city,
        coordinate: coordinate,
    },
    {headers: {"Content-type": "application/json", Authorization: 'Bearer ' + token}});
    
    return response;
}

async function createRecurringPlace(userId: string, name: string, address: string, city: string, coordinate: Array<string>, token: string): Promise<void> {
    const response = await axios.post(API_URL + `/safeplace/recurring`, {
        userId: userId,
        name: name,
        address: address,
        city: city,
        coordinate: coordinate
    },
    {headers: {"Content-type": "application/json"}});
  
    return response;
}

async function getSafeplaceNearest(latitude: number, longitude: number): Promise<void> {
    const response = await axios.post(API_URL + `/safeplace/safeplace/nearest`, {
        coord: {
            latitude: latitude,
            longitude: longitude
        }
    },
    {headers: {"Content-type": "application/json"}});
  
    return response;
}

export const safeplaceServices = {
    getSafeplace,
    getSafeplaceId,
    setCommentSafeplace,
    getCommentSafeplace,
    getRecurringPlaces,
    editRecurringPlace,
    createRecurringPlace,
    deleteRecurringPlace,
    getSafeplaceNearest
}