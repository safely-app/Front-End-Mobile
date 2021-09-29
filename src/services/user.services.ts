import axios from 'react-native-axios';
import {User} from '../redux/types';
import {API_URL} from '@env';

async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<User> {
  const response = await axios
    .post(API_URL + '/login', {
      email: username,       
      password,
    });

          
  return response.data;
}

async function register({username, password, email}: {username: string, password: string, email: string}): Promise<User> {
  const response = await axios
  .post(API_URL + '/register', {
    username: username,
    email: email,
    password: password,
  });
       
  return response.data;
}

async function forgotPassword(email: string): Promise<void> {
  const response = await axios.post(API_URL + '/user/forgotPassword', {"email": email});

  return response;
}

async function changePassword(userId: string, token: string, password: string): Promise<void> {
  const response = await axios.post(API_URL + '/user/changePassword', {"userId": userId, "token": token, "password": password});

  return response;
}

async function updateUser(userId: string, token: string, email: string, password: string, username: string) {
  const bodyObj = {
    username: username,
    email: email,
    role: "user",
    password: password,
  };

  const response = await axios.put(API_URL + `/user/${userId}`, bodyObj, {headers: {"Content-type": "application/json", Authorization: 'Bearer ' + token}});

  return response;
}

async function getUser(token: string, userId: string): Promise<User> {
  const response = await axios.get(API_URL + `/user/${userId}`, {headers: {"Content-type": "application/json", Authorization: 'Bearer ' + token}});
  
  return response.data;
}

async function deleteUser(token: string, userId: string): Promise<void> {
  const response = await axios.delete(API_URL + `/user/${userId}`, {headers: {"Content-type": "application/json", Authorization: 'Bearer ' + token}});

  return response;
}

export const userServices = {
  login,
  register,
  forgotPassword,
  changePassword,
  updateUser,
  getUser,
  deleteUser
};
