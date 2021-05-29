import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
import {UserLoginInterface, UserRegisterInterface} from '../redux/types';
import {API_URL} from "@env";

async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<UserLoginInterface> {
  const response = await axios
    .post(API_URL + '/login', {
      email: username, 
      password,
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      throw err;
    });
  return response;
}

async function register({username, password, email}: {username: string, password: string, email: string}): Promise<UserRegisterInterface> {
  const response = await axios
  .post(API_URL + '/register', {
    username: username,
    email: email,
    password: password,
  })
  .then(res => {
    return res.data;
  })
  .catch(err => {
    throw err;
  });
  return response;
}

export const userServices = {
  login,
  register
};
