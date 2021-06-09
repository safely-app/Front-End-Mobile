import React from 'react';
import {SafeAreaView, TextInput, TouchableOpacity, Text as OldText, ActivityIndicator} from 'react-native';
import {colorPlaceholder, stylesLogin} from '../styles'
import { Text } from '../components';

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

export const LoginComponent: React.FC<Props> = ({setUsername, setPassword, onLogin, username, password, isLoading, goToRegister, emailError, passwordError, checkEmail, checkPassword, goToForgetPWD}) => {

  const display = isLoading ? "none" : undefined;

  return (
    <SafeAreaView style={stylesLogin.loginContent}>
      <Text style={{marginBottom: 25}} type="h1" color="blue" size="xxl">Safely</Text>
      <TextInput
          style={stylesLogin.textInput}
          onChangeText={(text) => {setUsername(text); checkEmail(text);}}
          value={username}
          placeholder="Username"
          placeholderTextColor={colorPlaceholder}
      />
      <Text
        style={{marginTop: 5, marginBottom: 5}}
        type="body"
        color="red"
        size="s"
      >
        {emailError ? emailError[0] : ""}
      </Text>
      <TextInput
        style={stylesLogin.textInput}
        onChangeText={(password) => {setPassword(password); checkPassword(password)}}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
        placeholderTextColor={colorPlaceholder}
      />
      <Text
        style={{}}
        type="body"
        color="blue"
        size="s"
        onPress={() => {goToForgetPWD()}}
      >
        Forgot password ?
      </Text>
      <Text
        style={{marginTop: 5, marginBottom: 5}}
        type="body"
        color="red"
        size="s"
      >
        {passwordError ? passwordError[0] : ''}
      </Text>
      <TouchableOpacity
        style={[stylesLogin.button, {display, marginBottom: 17}]}
        onPress={() => {onLogin(username, password)}}
      >
        <OldText style={{color: 'white', fontFamily: "WorkSans-Bold", fontSize: 15}}>Login</OldText>
      </TouchableOpacity>

      <SafeAreaView style={{flexDirection: 'row', alignItems: 'center', marginLeft: 27}}>
        <SafeAreaView style={[stylesLogin.horizontalLine, {marginRight: 30}]} />
        <OldText style={{fontSize: 11}}>Or</OldText>
        <SafeAreaView style={[stylesLogin.horizontalLine, {marginLeft: 30}]} />
      </SafeAreaView>


      <TouchableOpacity
        style={[stylesLogin.button, {display, marginTop: 17}]}
        onPress={() => {goToRegister()}}
      >
        <OldText style={{color: 'white', fontFamily: "WorkSans-Bold", fontSize: 15}}>Register</OldText>
      </TouchableOpacity>
      <ActivityIndicator
        size="large"
        color="#0000ff"
        animating={isLoading}
      />
    </SafeAreaView>
  );
};
