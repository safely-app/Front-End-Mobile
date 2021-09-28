import React from 'react';
import {SafeAreaView, ActivityIndicator, Dimensions} from 'react-native';
import { Text, Button, HLine, TextInput } from '../components';

interface Props {
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  onLogin: (username: string, password: string) => void;
  isLoading: boolean;
  goToRegister: () => void;
  emailError: string;
  passwordError: string;
  username: string;
  password: string;
  checkEmail: (email: string) => void;
  checkPassword: (password: string) => void;
  goToForgetPWD: () => void;
}

export const LoginComponent = ({setUsername, setPassword, onLogin, username, password, isLoading, goToRegister, emailError, passwordError, checkEmail, checkPassword, goToForgetPWD}: Props): JSX.Element => {

  const display = isLoading ? {opacity: 0, height: 0} : undefined;

  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView
      style={{flex: 1, flexDirection: "column", justifyContent: "flex-end", marginBottom: windowHeight*0.15, marginLeft: windowWidth*0.05}}
    >
      <Text style={{marginBottom: 25}} type="h1" color="blue" size="xxl" testID="title">Safely</Text>
      <TextInput 
        style={{ fontFamily: 'WorkSans-Regular', paddingLeft: 10, marginBottom: 5 }}
        placeholder="Username"
        width="80%"
        type="roundedTextInput"
        bgColor="lightBlue"
        value={username}
        onChangeText={(text) => {setUsername(text); checkEmail(text)}}
        testID="inputUsername"
      />
      <Text
        style={{height: !emailError ? 0 : 20}}
        type="body"
        color="red"
        size="s"
      >
        {emailError ? emailError[0] : ""}
      </Text>
      <TextInput 
        style={{ fontFamily: 'WorkSans-Regular', paddingLeft: 10, marginTop: 5, marginBottom: 5 }}
        placeholder="Password"
        width="80%"
        type="roundedTextInput"
        bgColor="lightBlue"
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => {setPassword(text); checkPassword(text)}}
        testID="inputPassword"
      />
      <Text
        style={{height: !passwordError ? 0 : 20}}
        type="body"
        color="red"
        size="s"
      >
        {passwordError ? passwordError[0] : ''}
      </Text>
      <Text
        style={{marginTop: 10, marginBottom: 10}}
        type="body"
        color="blue"
        size="s"
        onPress={() => {goToForgetPWD()}}
      >
        Forgot password ?
      </Text>

      <Button
        style={{alignItems: "center", justifyContent: "center", ...display}}
        width="80%"
        type="roundedButton"
        bgColor="blue"
        onPress={() => {onLogin(username, password)}}
        testID="buttonLogin"
      >
        <Text style={{}} type="body" color="white" size="m">Login</Text>
      </Button>

      <SafeAreaView 
        style={{flexDirection: 'row', alignItems: "center", margin: 12, marginLeft: 57, ...display}}
      >
        <HLine style={{marginRight: 10}} width="25%" lineColor="blue" borderWidth={0.8} />
        <Text style={{}} type="body" color="blue" size="s">Or</Text>
        <HLine style={{marginLeft: 10}} width="25%" lineColor="blue" borderWidth={0.8} />
      </SafeAreaView>

      <Button
        style={{alignItems: "center", justifyContent: "center", ...display}}
        width="80%"
        type="roundedButton"
        bgColor="blue"
        onPress={() => {goToRegister()}}
        testID="buttonRegister"
      >
        <Text style={{}} type="body" color="white" size="m">Register</Text>
      </Button>

      <ActivityIndicator
          style={{marginRight: 50}}
          size="large"
          color="#0000ff"
          animating={isLoading}
      />
    </SafeAreaView>
  );
};
