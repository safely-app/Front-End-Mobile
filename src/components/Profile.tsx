import React from 'react';
import {SafeAreaView, TextInput, TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import {styles} from '../styles'

interface Props {
    email: string;
    setEmail: (email: string) => void;
    checkEmail: (email: string) => void;
    isLoading: boolean;
    onSubmit: (email: string, password: string) => void;
    emailError: string | undefined;
    passwordError: string | undefined;
    checkPassword: (password: string) => void;
    setPassword: (password: string) => void;
    password: string;
    onDelete: () => void;
    confirmPassword: string;
    setconfirmPassword: (password: string) => void;
}

export const ProfileComponent = ({email, setEmail, checkEmail, isLoading, onSubmit, emailError, passwordError, checkPassword, setPassword, password, onDelete, confirmPassword, setconfirmPassword}: Props): JSX.Element => {

  const display = isLoading ? "none" : undefined;
  let passwordRef: TextInput | null;
  let confirmPasswordRef: TextInput | null;

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
              testID="inputEmail"
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
              testID="inputPassword"
              ref={ref => {passwordRef = ref}}
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
                testID="inputConfirmPassword"
                ref={ref => {confirmPasswordRef = ref}}
            />
            <TouchableOpacity
              style={[styles.button, {display}]}
              onPress={() => {onSubmit(email, password); passwordRef?.clear(); confirmPasswordRef?.clear();}}
              testID="buttonSubmit"
            >
              <Text>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {display, backgroundColor: 'red', borderWidth: 0}]}
              onPress={() => {onDelete()}}
              testID="buttonDeleteAccount"
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