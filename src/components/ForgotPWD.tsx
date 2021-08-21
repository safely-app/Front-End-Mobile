import React from 'react';
import {SafeAreaView, TextInput, TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import {styles} from '../styles'

interface Props {
    checkEmail: (email: string) => void;
    onSubmit: (email: string) => void;
    setEmail: (email: string) => void;
    email: string;
    emailError: string;
    isLoading: boolean;
}

export const ForgotPWDComponent = ({checkEmail, onSubmit, setEmail, email, emailError, isLoading}: Props) => {

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
