import axios, { AxiosResponse } from 'axios';
import {User} from '../redux/types';
import {API_URL} from '@env';

async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<AxiosResponse<User>> {
  const response: AxiosResponse<User> = await axios
    .post<User>(API_URL + '/login', {
      email: username,       
      password,
    });

          
  return response;
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
  let bodyObj: {} = {}

  if (email.length > 0 && password.length === 0) {
    bodyObj = {
      email: email,
      role: "user",
    };
  } else if (password.length > 0 && email.length === 0) {
    bodyObj = {
      password: password,
      role: "user"
    }
  } else if (email.length > 0 && password.length > 0) {
    bodyObj = {
      email: email,
      password: password,
      role: "user"
    }
  }

  const response = await axios.put(API_URL + `/user/${userId}`, bodyObj, {headers: {"Content-type": "application/json", Authorization: 'Bearer ' + token}});

  return response;
}

async function getUser(token: string, userId: string): Promise<AxiosResponse<User>> {
  const response: AxiosResponse<User> = await axios.get<User>(API_URL + `/user/${userId}`, {headers: {"Content-type": "application/json", Authorization: 'Bearer ' + token}});
  
  return response;
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
