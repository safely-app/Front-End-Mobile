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
                _id: '60eeee559ce94d77061eef206c6',
                email: 'testsafelymobile@gmail.com',
                token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGU1NTljZTk0ZDc3MDYxZWVmMjA2YzYiLCJpYXQiOjE2MjgzNDU4OTAsImV4cCI6MTYyODM1MzA5MH0.bs1wG73YQG3NvPpL5PKqoe6JPVilglCcYBntYH8UKUioqfXM6yu-1zzIcMcOatNPFc1EI1nA05zdknEcsbmvdQ'
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