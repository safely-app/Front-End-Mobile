import React from 'react';
import {SafeAreaView, Text, Button} from 'react-native';
import {styles} from '../styles'

interface Props {
    logout: () => void;
    username: string;
}

export const HomeComponent = ({logout, username}: Props) => {

    return (
        <SafeAreaView style={styles.content}>
            <Text style={styles.title}>
                {`Welcome back ${username}`}
            </Text>
            <Text style={styles.title}>
                Page WIP
            </Text>
            <Button
                title="Log Out"
                onPress={() => {logout()}}
            />
        </SafeAreaView>
    )
}