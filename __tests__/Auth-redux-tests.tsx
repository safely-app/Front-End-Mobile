import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {loginUser} from '../src/redux/actions';
import {SET_AUTHENTICATED, FETCH_REQUEST, UserActionTypes} from '../src/redux/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

it('should login the user successfully', () => {
    const store = mockStore({});
    const credentials = {username: "testsafelymobile@gmail.com", password: "12345"};

    return store.dispatch<any>(loginUser(credentials))
    .then(() => {
        const actions = store.getActions();
        const expectedActions = [
            { type: FETCH_REQUEST },
            { type: SET_AUTHENTICATED, payload: {_id: actions[1].payload._id, email: "testsafelymobile@gmail.com", token: actions[1].payload.token}}
        ]
        expect(actions).toEqual(expectedActions);
    })
})