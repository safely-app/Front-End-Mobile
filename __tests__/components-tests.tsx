// import configureStore from 'redux-mock-store'
// import thunk from 'redux-thunk'
// // import {loginUser} from '../src/redux/actions';
// // import {SET_AUTHENTICATED, FETCH_REQUEST, UserActionTypes} from '../src/redux/types';

// const middlewares = [thunk];
// const mockStore = configureStore(middlewares);

// it('should login the user successfully', () => {
//     const store = mockStore({});
//     const credentials = {username: "testsafelymobile@gmail.com", password: "1234"};

//     return store.dispatch<any>(loginUser(credentials))
//     .then(() => {
//         const actions = store.getActions();
//         const expectedActions = [
//             { type: FETCH_REQUEST },
//             { type: SET_AUTHENTICATED, payload: {_id: actions[1].payload._id, email: "testsafelymobile@gmail.com", token: actions[1].payload.token}}
//         ]
//         expect(actions).toEqual(expectedActions);
//     })
// })

import { ChangePWD, ConfirmRoute, ForgotPWD, Home, Login, Profile, Register, Safeplace, SavedPlaces } from '../src/containers';
// import { render } from '../src/utils/tests';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
import React from 'react';

test("Login page render", () => {
    render((
        <Provider store={store}>
            <Login />
        </Provider>
    ))
})

test("ChangePWD page render", () => {
    render((
        <Provider store={store}>
            <ChangePWD />
        </Provider>
    ))
})

test("ForgotPWD page render", () => {
    render((
        <Provider store={store}>
            <ForgotPWD />
        </Provider>
    ))
})

test("Profile page render", () => {
    render((
        <Provider store={store}>
            <Profile />
        </Provider>
    ))
})

test("Register page render", () => {
    render((
        <Provider store={store}>
            <Register />
        </Provider>
    ))
})

test("Home page render", () => {
    render((
        <Provider store={store}>
            <Home />
        </Provider>
    ))
})

test("SavedPlaces page render", () => {
    render((
        <Provider store={store}>
            <SavedPlaces />
        </Provider>
    ))
})