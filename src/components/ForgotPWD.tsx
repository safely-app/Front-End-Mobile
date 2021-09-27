import React from 'react';
import {SafeAreaView, TouchableOpacity, ActivityIndicator, Dimensions} from 'react-native';
import { Text, Button, TextInput } from '../components';

interface Props {
    checkEmail: (email: string) => void;
    onSubmit: (email: string) => void;
    setEmail: (email: string) => void;
    email: string;
    emailError: string;
    isLoading: boolean;
}

export const ForgotPWDComponent = ({checkEmail, onSubmit, setEmail, email, emailError, isLoading}: Props): JSX.Element => {

    const display = isLoading ? "none" : "flex";

    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;

    return (
        <SafeAreaView style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
            <Text style={{margin: windowWidth*0.025}}type="h1" color="blue" size="xl" testID="forgotPWDTitle">Forgot password</Text>
            <Text style={{margin: windowWidth*0.025}} type="body" color="black" size="m" testID="forgotPWDDesc">If you have forgot your password, enter below the e-mail associated with your account, you will receive an email to reset your password.</Text>
            <TextInput 
                // style={styles.input}
                style={{margin: windowWidth*0.025, paddingLeft: 10}}
                type="roundedTextInput"
                bgColor="lightBlue"
                width="70%"
                onChangeText={(text) => {setEmail(text); checkEmail(text)}}
                value={email}
                placeholder="Email"
                placeholderTextColor="gray"
            />
            <Text style={{marginLeft: windowWidth*0.022}} type="body" color="red" size="s">
                {emailError ? emailError[0] : ''}
            </Text>
            <Button
                style={{alignItems: 'center', justifyContent: 'center', margin: windowWidth*0.022, display: display}}
                width="65%"
                type="roundedButton"
                bgColor="blue"
                onPress={() => {onSubmit(email)}}
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
