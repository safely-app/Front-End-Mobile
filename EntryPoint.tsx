import React from 'react';
import {StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import {SavedPlaces, Login, Register, Home, Profile, ForgotPWD, ChangePWD, Safeplace} from './src/containers';
import {persistor} from './src/redux';
import {PersistGate} from 'redux-persist/integration/react';
import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParamList} from './src/routes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {RootState} from './src/redux/reducers';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

const RootStack = createStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator(
);

const options: StackNavigationOptions = {
  headerShown: false
};

const EntryPoint: React.FC = () => {

  const {credentials} = useSelector((state: RootState) => state.user);

  function HomeTabs() {
    return (
      <Tab.Navigator
        // screenOptions={({ route }) => ({
        //   tabBarIcon: ({ focused, color, size }) => {
        //     let iconName;

        //     if (route.name === "Home") {
        //       iconName = 'home-outline'
        //     }
        //     if (route.name === "Profile") {
        //       iconName = 'person-circle-outline'
        //     }
        //     return <Ionicons name={iconName} size={size} color={color}/>;
        //   }
        // })}
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
