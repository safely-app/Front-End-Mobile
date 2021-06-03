import React from 'react';
import {SafeAreaView, StyleSheet, Text, Button} from 'react-native';

interface Props {
    logout: () => void;
    username: string;
}

export const HomeComponent: React.FC<Props> = ({logout, username}) => {

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

const styles = StyleSheet.create({
    input: {
      height: 40,
      width: '65%',
      margin: 12,
      borderWidth: 1,
      borderRadius: 10,
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