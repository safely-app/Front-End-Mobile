import React from 'react';
import {StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import {Login, Register, Home, Profile} from './src/containers';
import {persistor} from './src/redux';
import {PersistGate} from 'redux-persist/integration/react';
import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParamList} from './src/routes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {RootState} from './src/redux/reducers';

const RootStack = createStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator();

const options: StackNavigationOptions = {
  headerShown: false
};

const EntryPoint: React.FC = () => {

  const {credentials} = useSelector((state: RootState) => state.user);

  function HomeTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  }

  return (
    <PersistGate persistor={persistor}>
        <StatusBar barStyle="dark-content" hidden />
        <NavigationContainer>
            <RootStack.Navigator initialRouteName="Login">
                {credentials.token ? (            
                <>
                    <RootStack.Screen name="HomeTabs" component={HomeTabs} options={options} />
                </>
                ) : (
                <>
                    <RootStack.Screen name="Login" component={Login} options={options} />
                    <RootStack.Screen name="Register" component={Register} options={options} />
                </>
                )}
            </RootStack.Navigator>
        </NavigationContainer>
    </PersistGate>
  );
};

export default EntryPoint;
