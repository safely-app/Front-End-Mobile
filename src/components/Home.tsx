import React from 'react';
import {SafeAreaView, StyleSheet, TextInput, View, TouchableOpacity, Text, ActivityIndicator, Button} from 'react-native';

interface Props {
    logout: () => void;
}

export const HomeComponent: React.FC<Props> = ({logout}) => {

    return (
        <>
            <Text>
                Home
            </Text>
            <Button 
                title="Log Out"
                onPress={() => {logout()}}
            />
        </>
    )
}