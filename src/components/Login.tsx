import React from 'react';
import {SafeAreaView, TextInput, TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import {styles} from '../styles'

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
    <SafeAreaView style={styles.content}>
      <Text style={styles.title}>Login</Text>
      <TextInput
          style={styles.input}
          onChangeText={(text) => {setUsername(text); checkEmail(text);}}
          value={username}
          placeholder="Username"
          placeholderTextColor="gray"
      />
      <Text style={{color: 'red', marginLeft: 12}}>
        {emailError ? emailError[0] : ''}
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={(password) => {setPassword(password); checkPassword(password)}}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
        placeholderTextColor="gray"
      />
      <Text style={{color: 'blue', marginLeft: 12}} onPress={() => {goToForgetPWD()}}>
        Forgot password ?
      </Text>
      <Text style={{color: 'red', margin: 12}}>
        {passwordError ? passwordError[0] : ''}
      </Text>
      <TouchableOpacity
        style={[styles.button, {display}]}
        onPress={() => {onLogin(username, password)}}
      >
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, {display}]}
        onPress={() => {goToRegister()}}
      >
        <Text>Register</Text>
      </TouchableOpacity>
      <ActivityIndicator
        size="large"
        color="#0000ff"
        animating={isLoading}
      />
    </SafeAreaView>
  );
};
