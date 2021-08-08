import {request, failure} from '../../../src/redux/actions/index';
import axios from 'react-native-axios';
import { userServices } from '../../../src/services';
import { loginUserSuccess } from '../../../src/redux';

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
        const mockedFailedRes = {
            data: {
                error: 'Incorrect email or password'
            }
        }

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