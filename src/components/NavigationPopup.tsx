import React from 'react';
import { Text, Button, HLine, TextInput } from '../components';
import {View} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons'
import { WebView } from 'react-native-webview'

interface Props {
    directionText: string;
    metersText: string | undefined;
}

export const NavigationPopupComponent = ({directionText, metersText}: Props): JSX.Element => {

    return (
        <View style={{
            alignItems: "center",
            marginTop: 60,
        }}>
            <View
                style={{
                    width: 360,
                    height: 100,
                    backgroundColor: "white",
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 5,
                    borderRadius: 25,
                }}
            >
                <View style={{flex: 1, flexDirection: "row"}}>
                    <FontAwesomeIcon icon={faArrowCircleUp} color={"#16304A"} size={56} style={{margin: 20}} />
                    <View style={{flex: 1, flexDirection: "column", marginTop: 15}}>
                        {/* <Text size="m" type="body" color="blue">
                            {directionText.length > 0 ? directionText : "Undefined"}
                        </Text> */}
                        {directionText && directionText.length > 0 ? (
                            <WebView
                                source={{ html: directionText, baseUrl: '' }}
                                originWhitelist={["*"]}
                            />
                        ) : null}
                        <Text size="s" type="h1" color="blue" style={{marginBottom: 10}}>
                            {metersText && metersText.length > 0 ? metersText : "Undefined"}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
