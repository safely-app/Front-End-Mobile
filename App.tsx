import React from 'react';
import {SafeAreaView, StatusBar, Text} from 'react-native';
import {Provider} from 'react-redux';
import {Login, Register} from './src/containers';
import {store} from './src/redux';
import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParamList} from './src/routes';

const RootStack = createStackNavigator<RootStackParamList>();

const options: StackNavigationOptions = {
  headerShown: false
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" hidden />
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Login">
          <RootStack.Screen name="Login" component={Login} options={options} />
          <RootStack.Screen name="Register" component={Register} options={options} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
