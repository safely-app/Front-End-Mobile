import React from 'react';
import {SafeAreaView, TouchableOpacity, TextInput, Text, ActivityIndicator} from 'react-native';
import {styles} from '../styles'

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
  return (
    <SafeAreaView style={styles.content}>
      <Text style={styles.title}>Register</Text>
      <TextInput 
        placeholder="Username"
        placeholderTextColor="gray"
        style={styles.input}
        value={username}
        onChangeText={(text) => {setUsername(text); checkUsername(text);}}
        testID="inputUsername"
        />
      <Text style={{color: 'red', marginLeft: 12}}>
        {usernameError ? usernameError[0] : ''}
      </Text>
      <TextInput 
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="gray"
        value={email}
        onChangeText={(text) => {setEmail(text); checkEmail(text);}}
        testID="inputEmail"
      />
      <Text style={{color: 'red', marginLeft: 12}}>
        {emailError ? emailError[0] : ''}
      </Text>
      <TextInput 
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="gray"
        value={password}
        onChangeText={(text) => {setPassword(text); checkPassword(text);}}
        secureTextEntry={true}
        testID="inputPassword"
      />
      <Text style={{color: 'red', marginLeft: 12}}>
        {passwordError ? passwordError[0] : ''}
      </Text>
      <TextInput 
        style={[styles.input, {}]}
        onChangeText={(text) => {setconfirmPassword(text);}}
        value={confirmPassword}
        placeholder="Confirm password"
        secureTextEntry={true}
        placeholderTextColor="gray"
        testID="inputConfirmPassword"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {onRegister(username, password, email)}}
        testID="buttonRegister"
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
