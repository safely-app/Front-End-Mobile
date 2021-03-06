import React from 'react';
import {StatusBar} from 'react-native';
import {SavedPlaces, Login, Register, Home, Profile, ForgotPWD, ChangePWD, Safeplace, InputAddress} from './src/containers';
import {persistor} from './src/redux';
import {PersistGate} from 'redux-persist/integration/react';
import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParamList} from './src/routes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Toast from 'react-native-toast-message';
import { useAppSelector } from './src/utils/hooks';
import { faLocationArrow, faMapPin, faStore } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const RootStack = createStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator(
);

const options: StackNavigationOptions = {
  headerShown: false
};

const EntryPoint: React.FC = () => {

  const {credentials} = useAppSelector((state) => state.user);

  function HomeTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home")
              iconName = faLocationArrow
            if (route.name === "Profile")
              iconName = faStore
            if (route.name === "Saved Places")
              iconName = faMapPin
            
            return <FontAwesomeIcon icon={iconName} color={"#1E90FF"} size={14}/>
          }
        })}
      >
        <Tab.Screen name="Home" component={Home} options={{tabBarTestID: "HomePage"}} />
        <Tab.Screen name="Profile" component={Profile} options={{tabBarTestID: "ProfilePage"}} />
        <Tab.Screen name="Saved Places" component={SavedPlaces} options={{tabBarTestID: "SavedPlacesPage"}} />
      </Tab.Navigator>
    );
  }

  return (
    <PersistGate persistor={persistor}>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer>
            <RootStack.Navigator initialRouteName="Login">
                {credentials.token ? (            
                <>
                    <RootStack.Screen name="HomeTabs" component={HomeTabs} options={options} />
                    <RootStack.Screen name="Safeplace" component={Safeplace} options={options} />
                    <RootStack.Screen name="InputAddress" component={InputAddress} options={options} />
                </>
                ) : (
                <>
                    <RootStack.Screen name="Login" component={Login} options={options} />
                    <RootStack.Screen name="Register" component={Register} options={options} />
                    <RootStack.Screen name="ForgotPWD" component={ForgotPWD} options={options} />
                    <RootStack.Screen name="ChangePWD" component={ChangePWD} options={options} />
                </>
                )}
            </RootStack.Navigator>
            <Toast ref={(ref) => {Toast.setRef(ref)}} />
        </NavigationContainer>
    </PersistGate>
  );
};

export default EntryPoint;
