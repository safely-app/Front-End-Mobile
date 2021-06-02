import { ErrorMessage } from 'formik';
import React from 'react';
import {SafeAreaView, StyleSheet, TextInput, View, TouchableOpacity, Text, ActivityIndicator} from 'react-native';

interface Props {
    checkEmail: (email: string) => void;
    onSubmit: (email: string) => void;
    setEmail: (email: string) => void;
    email: string;
    emailError: string;
    isLoading: boolean;
}

export const ForgotPWDComponent: React.FC<Props> = ({checkEmail, onSubmit, setEmail, email, emailError, isLoading}) => {

    const display = isLoading ? "none" : undefined;

    return (
        <SafeAreaView style={styles.content}>
            <Text style={styles.title}>Forgot password</Text>
            <TextInput 
                style={styles.input}
                onChangeText={(text) => {setEmail(text); checkEmail(text)}}
                value={email}
                placeholder="Email"
                placeholderTextColor="gray"
            />
            <Text style={{color: 'red', marginLeft: 12}}>
                {emailError ? emailError[0] : ''}
            </Text>
            <TouchableOpacity
                style={[styles.button, {display}]}
                onPress={() => {onSubmit(email)}}
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