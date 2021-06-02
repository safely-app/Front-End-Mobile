import React from 'react';
import {SafeAreaView, StyleSheet, TextInput, View, TouchableOpacity, Text, ActivityIndicator} from 'react-native';

interface Props {
    password: string;
    setPassword: (password: string) => void;
    passwordError: string;
    isLoading: boolean;
    checkPassword: (password: string) => void;
    onSubmit: (password: string) => void;
    confirmPassword: string;
    setconfirmPassword: (password: string) => void;
}

export const ChangePWDComponent: React.FC<Props> = ({password, setPassword, checkPassword, passwordError, isLoading, onSubmit, confirmPassword, setconfirmPassword}) => {

    const display = isLoading ? "none" : undefined;

    return (
        <SafeAreaView style={styles.content}>
            <Text style={styles.title}>Enter your new password</Text>
            <TextInput 
                style={styles.input}
                onChangeText={(text) => {setPassword(text); checkPassword(text)}}
                value={password}
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor="gray"
            />
            <Text style={{color: 'red', marginLeft: 12}}>
                {passwordError ? passwordError[0] : ''}
            </Text>
            <TextInput 
                style={styles.input}
                onChangeText={(text) => {setconfirmPassword(text);}}
                value={confirmPassword}
                placeholder="Confirm password"
                secureTextEntry={true}
                placeholderTextColor="gray"
            />
            <TouchableOpacity
                style={[styles.button, {display}]}
                onPress={() => {onSubmit(password)}}
            >
                <Text>Submit</Text>
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