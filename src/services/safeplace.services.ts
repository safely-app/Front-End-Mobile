import axios, { AxiosResponse } from 'axios';
import {SafeplaceCommentsInterface, SafeplaceInterface, SafeplaceRecurringInterface} from '../../types/safeplace';
import {API_URL} from '@env';
import { APIResponse } from '../../types/api';

async function getSafeplace(token: string): Promise<AxiosResponse<SafeplaceInterface[]>> {
    const response: AxiosResponse<SafeplaceInterface[]> = await axios.get<SafeplaceInterface[]>(API_URL + `/safeplace/safeplace`, {headers: {"Content-type": "application/json", Authorization: 'Bearer ' + token}});
     
    return response;
}

async function getSafeplaceId(id: string, token: string): Promise<AxiosResponse<SafeplaceInterface>> {
    const response: AxiosResponse<SafeplaceInterface> = await axios.get<SafeplaceInterface>(API_URL + `/safeplace/safeplace/${id}`, {headers: {"Content-type": "application/json", Authorization: 'Bearer ' + token}});
  
    return response;
}

async function setCommentSafeplace(comment: string, idSafeplace: string, idUser: string, grade: number, token: string): Promise<AxiosResponse<APIResponse>> {
    
    const response: AxiosResponse<APIResponse> = await axios.post<APIResponse>(API_URL + '/safeplace/comment', {userId: idUser, safeplaceId: idSafeplace, comment: comment, grade: grade.toString()}, {headers: {"Content-type": "application/json", Authorization: 'Bearer ' + token}});

    return response;
}

async function getCommentSafeplace(token: string): Promise<AxiosResponse<SafeplaceCommentsInterface[]>> {
    const response: AxiosResponse<SafeplaceCommentsInterface[]> = await axios.get<SafeplaceCommentsInterface[]>(API_URL + `/safeplace/comment`, {headers: {"Content-type": "application/json", Authorization: 'Bearer ' + token}});

    return response;
}

async function getRecurringPlaces(token: string): Promise<AxiosResponse<SafeplaceRecurringInterface[]>> {
    const response: AxiosResponse<SafeplaceRecurringInterface[]> = await axios.get<SafeplaceRecurringInterface[]>(API_URL + `/safeplace/recurring`, {headers: {"Content-type": "application/json", Authorization: 'Bearer ' + token}});
    
    return response;
}

async function deleteRecurringPlace(idPlace: string, token: string): Promise<void> {
    const response = await axios.delete(API_URL + `/safeplace/recurring/${idPlace}`, {headers: {"Content-type": "application/json", Authorization: 'Bearer ' + token}});
  
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

async function createRecurringPlace(userId: string, name: string, address: string, city: string, coordinate: Array<string>, token: string): Promise<AxiosResponse<APIResponse>> {
    const response: AxiosResponse<APIResponse> = await axios.post<APIResponse>(API_URL + `/safeplace/recurring`, {
        userId: userId,
        name: name,
        address: address,
        city: city,
        coordinate: coordinate
    },
    {headers: {"Content-type": "application/json", Authorization: 'Bearer ' + token}});
  
    return response;
}

async function getSafeplaceNearest(latitude: number, longitude: number, token: string): Promise<AxiosResponse<SafeplaceInterface>> {
    const response: AxiosResponse<SafeplaceInterface> = await axios.post<SafeplaceInterface>(API_URL + `/safeplace/safeplace/nearest`, {
        coord: {
            latitude: latitude,
            longitude: longitude
        }
    },
    {headers: {"Content-type": "application/json", Authorization: 'Bearer ' + token}});
  
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