import React from 'react';
import {SafeAreaView, ActivityIndicator, Dimensions} from 'react-native';
import { Text, Button, TextInput } from '../components';

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

export const ChangePWDComponent = ({password, setPassword, checkPassword, passwordError, isLoading, onSubmit, confirmPassword, setconfirmPassword}: Props): JSX.Element => {

    const display = isLoading ? "none" : "flex";

    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;

    return (
        <SafeAreaView style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
            <Text style={{margin: windowWidth*0.025}} type="h1" color="blue" size="xl" testID="changePWDTitle">Enter your new password</Text>
            <TextInput 
                style={{margin: windowWidth*0.025, paddingLeft: 10}}
                type="roundedTextInput"
                bgColor="lightBlue"
                width="70%"
                onChangeText={(text) => {setPassword(text); checkPassword(text)}}
                value={password}
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor="gray"
            />
            <Text style={{marginLeft: windowWidth*0.022}} type="body" color="red" size="s">
                {passwordError ? passwordError[0] : ''}
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
            />
            <Button
                style={{alignItems: 'center', justifyContent: 'center', margin: windowWidth*0.022, display: display}}
                width="65%"
                type="roundedButton"
                bgColor="blue"
                onPress={() => {onSubmit(password)}}
            >
                <Text type="body" color="white" size="m">Submit</Text>
            </Button>
            <ActivityIndicator
              size="large"
              color="#0000ff"
              animating={isLoading}
            />
        </SafeAreaView>
    )
}
