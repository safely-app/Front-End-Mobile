import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux';
import {StackNavigationOptions} from '@react-navigation/stack';
import EntryPoint from './EntryPoint';

// const RootStack = createStackNavigator<RootStackParamList>();

// const Tab = createBottomTabNavigator();

const options: StackNavigationOptions = {
  headerShown: false
};

const App: React.FC = () => {

  return (
    <Provider store={store}>
      <EntryPoint />
    </Provider>
  );
};

export default App;
