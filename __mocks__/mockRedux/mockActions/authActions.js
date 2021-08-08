import {request, failure} from '../../../src/redux/actions/index';
import axios from 'react-native-axios';
import { userServices } from '../../../src/services';
import { loginUserSuccess, registerUserSuccess, getUserAction } from '../../../src/redux';

jest.mock('react-native-axios');

export function mockLoginUser(username, password) {
    return (dispatch) => {
        dispatch(request());
        const mockedSuccessRes = {
            data: {
                _id: '52342353654',
                email: 'testsafelymobile@gmail.com',
                token: '32454'
            }
        };

        if (username === "testsafelymobile@gmail.com" && password === "1234") {
            axios.post = jest.fn().mockResolvedValue(mockedSuccessRes);
        } else {
            axios.post = jest.fn().mockResolvedValue(Promise.reject("Error: Request failed with status code 401"));
        }

        return userServices
            .login({username, password})
            .then(response => {
                dispatch(loginUserSuccess(response));
            })
            .catch(error => {
                dispatch(failure('Login failure'));
            })
    }
}

export function mockRegisterUser(username, email, password) {
    return (dispatch) => {
        dispatch(request());
        const mockedSuccessRes = {
            data: {
                _id: '52342353654',
                username: 'barbie',
                email: 'barbie@ken.fr',
                token: '53040'
            }
        };

        axios.post = jest.fn().mockResolvedValue(mockedSuccessRes);

        return userServices
            .register({username, password, email})
            .then(response => {
                dispatch(registerUserSuccess(response));
            })
            .catch(error => {
                dispatch(failure('Login failure'));
            })
    }
}

export function mockGetUser(userId, token) {
    return (dispatch) => {
        dispatch(request());
        const mockedSuccessRes = {
            data: {
                _id: '52342353654',
                username: 'barbie',
                email: 'barbie@ken.fr',
                role: 'user',
                createdAt: '1993-01-02T07:32:50.292Z',
                updatedAt: '1993-01-02T07:32:50.292Z'
            }
        };

        axios.get = jest.fn().mockResolvedValue(mockedSuccessRes);

        return userServices
            .getUser(token, userId)
            .then(response => {
                dispatch(getUserAction(response));
            })
            .catch(error => {
                dispatch(failure('Login failure'));
            })
    }
}