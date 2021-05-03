import React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, TextInput, Text, View} from 'react-native';

interface Props {
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setEmail: (email: string) => void;
  onRegister: (username: string, password: string, email: string) => void
  username: string;
  password: string;
  email: string;
}

export const RegisterComponent: React.FC<Props> = ({setUsername, setPassword, setEmail, username, password, email, onRegister}) => {
  return (
    <SafeAreaView style={styles.content}>
      <Text style={styles.title}>Register</Text>
      <TextInput 
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput 
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput 
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {onRegister(username, password, email)}}
      >
        <Text>Register</Text>
      </TouchableOpacity>
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
