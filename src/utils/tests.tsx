import React, { FC, ReactElement, ReactNode } from 'react';
import { render as rtlRender, RenderOptions, RenderAPI } from '@testing-library/react-native';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userReducer, {initialState} from '../redux/reducers/user.reducers';
import { RootState } from '../redux/reducers';
import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';

type ReduxRenderOptions = {
    preloadedState?: RootState;
    store?: EnhancedStore;
    renderOptions?: Omit<RenderOptions, "wrapper">
}

export const middlewares = [thunk];

export const createStoreWithMiddlewares = (): Store => {
  return createStore(
    userReducer,
    initialState,
    applyMiddleware(...middlewares)
  );
}

function render(
    ui: ReactElement,
    {
        preloadedState,
        store = createStoreWithMiddlewares(),
        ...renderOptions
    }: ReduxRenderOptions = {}
) {
    function Wrapper({ children }: { children?: ReactNode }): ReactElement {
        return (
            <Provider store={store}>
                <StatusBar barStyle="dark-content" />
                {children}
                <Toast ref={(ref) => {Toast.setRef(ref)}} />
            </Provider>
        )
    }

    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from "@testing-library/react-native";

export { render }