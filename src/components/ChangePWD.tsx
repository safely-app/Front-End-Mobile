import React from 'react';
import {SafeAreaView, TextInput, TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import {styles} from '../styles'

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
