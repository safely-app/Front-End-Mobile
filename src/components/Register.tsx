import React from 'react';
import {SafeAreaView, ActivityIndicator, Dimensions} from 'react-native';
import { Text, Button, TextInput } from '../components';

interface Props {
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setEmail: (email: string) => void;
  onRegister: (username: string, password: string, email: string) => void
  username: string;
  usernameError: string;
  password: string;
  passwordError: string;
  email: string;
  emailError: string;
  isLoading: boolean;
  checkEmail: (email: string) => void;
  checkPassword: (password: string) => void;
  checkUsername: (username: string) => void;
  confirmPassword: string;
  setconfirmPassword: (password: string) => void;
}

export const RegisterComponent  = ({setUsername, setPassword, setEmail, username, password, email, onRegister, emailError, passwordError, usernameError, isLoading, checkEmail, checkPassword, checkUsername, confirmPassword, setconfirmPassword}: Props): JSX.Element => {
  
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  
  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'column', justifyContent: 'center', margin: windowWidth*0.020}}>
      <Text type="h1" color="blue" size="xxl" testID="titleRegister" style={{margin: windowWidth*0.020}}>Register</Text>
      <TextInput 
        placeholder="Username"
        placeholderTextColor="gray"
        style={{margin: windowWidth*0.022, paddingLeft: 10}}
        type="roundedTextInput"
        bgColor="lightBlue"
        width="65%"
        value={username}
        onChangeText={(text) => {setUsername(text); checkUsername(text);}}
        testID="inputUsername"
        />
      <Text style={{marginLeft: windowWidth*0.022}} type="body" color="red" size="s">
        {usernameError ? usernameError[0] : ''}
      </Text>
      <TextInput 
        style={{margin: windowWidth*0.022, paddingLeft: 10}}
        bgColor="lightBlue"
        width="65%"
        type="roundedTextInput"
        placeholder="Email"
        placeholderTextColor="gray"
        value={email}
        onChangeText={(text) => {setEmail(text); checkEmail(text);}}
        testID="inputEmail"
      />
      <Text style={{marginLeft: windowWidth*0.022}} type="body" color="red" size="s">
        {emailError ? emailError[0] : ''}
      </Text>
      <TextInput 
        style={{margin: windowWidth*0.022, paddingLeft: 10}}
        bgColor="lightBlue"
        width="65%"
        type="roundedTextInput"
        placeholder="Password"
        placeholderTextColor="gray"
        value={password}
        onChangeText={(text) => {setPassword(text); checkPassword(text);}}
        secureTextEntry={true}
        testID="inputPassword"
      />
      <Text style={{marginLeft: windowWidth*0.022}} type="body" color="red" size="s">
        {passwordError ? passwordError[0] : ''}
      </Text>
      <TextInput 
        style={{margin: windowWidth*0.022, paddingLeft: 10}}
        bgColor="lightBlue"
        width="65%"
        type="roundedTextInput"
        onChangeText={(text) => {setconfirmPassword(text);}}
        value={confirmPassword}
        placeholder="Confirm password"
        secureTextEntry={true}
        placeholderTextColor="gray"
        testID="inputConfirmPassword"
      />
      <Button
        style={{alignItems: 'center', justifyContent: 'center', margin: windowWidth*0.022, marginTop: windowWidth*0.045}}
        width="65%"
        type="roundedButton"
        bgColor="blue"
        onPress={() => {onRegister(username, password, email)}}
        testID="buttonRegister"
      >
        <Text type="body" color="white" size="m">Register</Text>
      </Button>
      <ActivityIndicator
        size="large"
        color="#0000ff"
        animating={isLoading}
      />
    </SafeAreaView>
  );
};
