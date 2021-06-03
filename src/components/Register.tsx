import React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, TextInput, Text, ActivityIndicator} from 'react-native';

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

export const RegisterComponent: React.FC<Props> = ({setUsername, setPassword, setEmail, username, password, email, onRegister, emailError, passwordError, usernameError, isLoading, checkEmail, checkPassword, checkUsername, confirmPassword, setconfirmPassword}) => {
  return (
    <SafeAreaView style={styles.content}>
      <Text style={styles.title}>Register</Text>
      <TextInput 
        placeholder="Username"
        placeholderTextColor="gray"
        style={styles.input}
        value={username}
        onChangeText={(text) => {setUsername(text); checkUsername(text);}}
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
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {onRegister(username, password, email)}}
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
    borderWidth: 2,
    color: 'black'
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
