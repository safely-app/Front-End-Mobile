import axios from 'react-native-axios';
import {API_URL} from "@env";
import {SafeplaceInterface} from '../../types/safeplace';

async function getSafeplace(): Promise<SafeplaceInterface[]> {
    const response = await axios.get(API_URL + `/safeplace/safeplace`, {headers: {"Content-type": "application/json"}});
  
    return response;
}

async function getSafeplaceId(id: string): Promise<SafeplaceInterface[]> {
    const response = await axios.get(API_URL + `/safeplace/safeplace/${id}`, {headers: {"Content-type": "application/json"}});
  
    return response;
}

export const safeplaceServices = {
    getSafeplace,
    getSafeplaceId
}