import React from 'react';
import {SafeAreaView, StyleSheet, TextInput, View, TouchableOpacity, Text, ActivityIndicator} from 'react-native';

interface Props {
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  onLogin: (username: string, password: string) => void;
  goToRegister: () => void;
  username: string;
  password: string;
  isLoading: boolean;
}

export const LoginComponent: React.FC<Props> = ({setUsername, setPassword, onLogin, username, password, isLoading, goToRegister}) => {

  const display = isLoading ? "none" : undefined;

  return (
    <SafeAreaView style={styles.content}>
      <Text style={styles.title}>Login</Text>
      <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder="Username"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
        />
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
