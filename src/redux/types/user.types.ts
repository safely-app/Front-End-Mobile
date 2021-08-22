import { fetchStatus } from './';

interface User {
  _id: string;
  email: string;
  token: string;
  username: string;
  response: fetchStatus
}

interface UserLoginCredentials {
  email: string;
  password: string;
};

export type { UserLoginCredentials, User }