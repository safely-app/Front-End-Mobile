import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {UserLoginInterface, UserRegisterInterface} from '../redux/types';

async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<UserLoginInterface> {
  const response = await axios
    .post('http://api.safely-app.fr/login', {
      email: username,
      password,
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return err;
    });
  return response;
}

async function register({username, password, email}: {username: string, password: string, email: string}): Promise<UserRegisterInterface> {
  const response = await axios
  .post('http://api.safely-app.fr/register', {
    username: username,
    email: email,
    password: password,
  })
  .then(res => {
    return res.data;
  })
  .catch(err => {
    return err;
  });
  return response;
}

export const userServices = {
  login,
  register
};
