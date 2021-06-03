import React from 'react';
import {SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text, ActivityIndicator} from 'react-native';

interface Props {
    email: string;
    setEmail: (email: string) => void;
    checkEmail: (email: string) => void;
    isLoading: boolean;
    onSubmit: (email: string, password: string) => void;
    emailError: string;
    passwordError: string;
    checkPassword: (password: string) => void;
    setPassword: (password: string) => void;
    password: string;
    onDelete: () => void;
    confirmPassword: string;
    setconfirmPassword: (password: string) => void;
}

export const ProfileComponent: React.FC<Props> = ({email, setEmail, checkEmail, isLoading, onSubmit, emailError, passwordError, checkPassword, setPassword, password, onDelete, confirmPassword, setconfirmPassword}) => {

  const display = isLoading ? "none" : undefined;

    return (
        <SafeAreaView style={styles.content}>
            <Text style={styles.title}>
                Edit your information
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => {setEmail(text); checkEmail(text);}}
              value={email}
              placeholder="Email"
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
            <Text style={{color: 'red', margin: 12, marginBottom: 0, marginTop: 0}}>
              {passwordError ? passwordError : ''}
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
              style={[styles.button, {display}]}
              onPress={() => {onSubmit(email, password)}}
            >
              <Text>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {display, backgroundColor: 'red', borderWidth: 0}]}
              onPress={() => {onDelete()}}
            >
              <Text>Delete your account</Text>
            </TouchableOpacity>
            <ActivityIndicator
              size="large"
              color="#0000ff"
              animating={isLoading}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      width: '65%',
      margin: 12,
      borderWidth: 1,
      borderRadius: 10,
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