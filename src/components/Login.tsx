import React from 'react';
import {SafeAreaView, StyleSheet, TextInput, View, TouchableOpacity, Text, ActivityIndicator} from 'react-native';

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
}

export const LoginComponent: React.FC<Props> = ({setUsername, setPassword, onLogin, username, password, isLoading, goToRegister, emailError, passwordError, checkEmail, checkPassword}) => {

  const display = isLoading ? "none" : undefined;

  return (
    <SafeAreaView style={styles.content}>
      <Text style={styles.title}>Login</Text>
      <TextInput
          style={styles.input}
          onChangeText={(text) => {setUsername(text); checkEmail(text);}}
          value={username}
          placeholder="Username"
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
      />
      <Text style={{color: 'red', marginLeft: 12}}>
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

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '65%',
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    borderWidth: 2
  },
  button: {
    height: 40,
    width: '35%',
    margin: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  title: {
    margin: 12,
    fontSize: 30,
    fontWeight: 'bold'
  }
});
