import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {SET_AUTHENTICATED, FETCH_REQUEST, FETCH_FAILURE, USER_CREATED} from '../src/redux/types';
import { mockLoginUser } from '../__mocks__/mockRedux/mockActions/authActions';
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