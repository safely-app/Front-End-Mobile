import React from 'react';
import {SafeAreaView, TouchableOpacity, ActivityIndicator, Dimensions} from 'react-native';
import { Text, Button, TextInput } from '../components';

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

export const ProfileComponent = ({email, setEmail, checkEmail, isLoading, onSubmit, emailError, passwordError, checkPassword, setPassword, password, onDelete, confirmPassword, setconfirmPassword}: Props): JSX.Element => {

  const display = isLoading ? "none" : "flex";

  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;

    return (
        <SafeAreaView style={{flex: 1, flexDirection: 'column', justifyContent: 'center', margin: windowWidth*0.025}}>
            <Text style={{margin: windowWidth*0.025}} type="h1" color="blue" size="xl" testID="ProfileTitle">
                Edit your information
            </Text>
            <TextInput
              style={{margin: windowWidth*0.025, paddingLeft: 10}}
              type="roundedTextInput"
              bgColor="lightBlue"
              width="70%"
              onChangeText={(text) => {setEmail(text); checkEmail(text);}}
              value={email}
              placeholder="Email"
              placeholderTextColor="gray"
              testID="inputEmail"
            />
            <Text style={{marginLeft: windowWidth*0.022}} type="body" color="red" size="s">
              {emailError ? emailError[0] : ''}
            </Text>
            <TextInput
              style={{margin: windowWidth*0.025, paddingLeft: 10}}
              type="roundedTextInput"
              bgColor="lightBlue"
              width="70%"
              onChangeText={(password) => {setPassword(password); checkPassword(password)}}
              value={password}
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="gray"
              testID="inputPassword"
            />
            <Text style={{margin: 12, marginBottom: 0, marginTop: 0}} type="body" color="red" size="s">
              {passwordError ? passwordError : ''}
            </Text>
            <TextInput 
                style={{margin: windowWidth*0.025, paddingLeft: 10}}
                type="roundedTextInput"
                bgColor="lightBlue"
                width="70%"
                onChangeText={(text) => {setconfirmPassword(text);}}
                value={confirmPassword}
                placeholder="Confirm password"
                secureTextEntry={true}
                placeholderTextColor="gray"
                testID="inputConfirmPassword"
            />
            <Button
              style={{alignItems: 'center', justifyContent: 'center', margin: windowWidth*0.022, display: display}}
              width="65%"
              type="roundedButton"
              bgColor="blue"
              onPress={() => {onSubmit(email, password)}}
            >
              <Text type="body" color="white" size="m">Submit</Text>
            </Button>
            <Button
              style={{alignItems: 'center', justifyContent: 'center', margin: windowWidth*0.022, display: display}}
              onPress={() => {onDelete()}}
              testID="buttonDeleteAccount"
              bgColor="red"
              type="roundedButton"
              width="65%"
            >
              <Text type="body" color="white" size="m">Delete your account</Text>
            </Button>
            <ActivityIndicator
              size="large"
              color="#0000ff"
              animating={isLoading}
            />

        </SafeAreaView>
    )
}