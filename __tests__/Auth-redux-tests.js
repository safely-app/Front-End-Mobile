import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {SET_AUTHENTICATED, FETCH_REQUEST, FETCH_FAILURE, USER_CREATED, GET_USER} from '../src/redux/types';
import { mockLoginUser, mockRegisterUser, mockGetUser } from '../__mocks__/mockRedux/mockActions/authActions';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

it('should login the user successfully', () => {
    const store = mockStore({});
    const credentials = {username: "testsafelymobile@gmail.com", password: "1234"};

    return store.dispatch(mockLoginUser(credentials.username, credentials.password))
    .then(() => {
        const actions = store.getActions();
        const expectedActions = [
            { type: FETCH_REQUEST },
            { type: SET_AUTHENTICATED, payload: {_id: actions[1].payload._id, email: "testsafelymobile@gmail.com", token: actions[1].payload.token}}
        ]
        expect(actions).toEqual(expectedActions);
    })
})

it('shouldn\'t login the user', () => {
    const store = mockStore({});
    const credentials = {username: "testsafelymobile@gmail.com", password: "12345"};

    return store.dispatch(mockLoginUser(credentials.username, credentials.password))
    .then(() => {
        const actions = store.getActions();
        const expectedActions = [
            { type: FETCH_REQUEST },
            { type: FETCH_FAILURE, payload: "Login failure"}
        ]
        expect(actions).toEqual(expectedActions);
    })
})

it('should register a user', () => {
    const store = mockStore({});
    const credentials = {username: "barbie", email: "barbie@ken.fr", password: "1234"};


    return store.dispatch(mockRegisterUser(credentials))
    .then(() => {
        const actions = store.getActions();
        const expectedActions = [
            { type: FETCH_REQUEST },
            { type: USER_CREATED, payload: {_id: actions[1].payload._id, username: "barbie", email: "barbie@ken.fr", token: actions[1].payload.token}}
        ]
        expect(actions).toEqual(expectedActions);
    })
})

it('should get user\'s informations', () => {
    const store = mockStore({});
    const credentials = {userId: "123456745623", token: "0593405349"};


    return store.dispatch(mockGetUser(credentials.userId, credentials.token))
    .then(() => {
        const actions = store.getActions();
        const expectedActions = [
            { type: FETCH_REQUEST },
            { type: GET_USER, payload: {_id: actions[1].payload._id, username: "barbie", email: "barbie@ken.fr", role: actions[1].payload.role, createdAt: actions[1].payload.createdAt, updatedAt: actions[1].payload.updatedAt}}
        ]
        expect(actions).toEqual(expectedActions);
    })
})