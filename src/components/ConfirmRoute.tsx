import React from 'react';
import { Animated, TextInput, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft, faExchangeAlt, faLocationArrow, faMapMarkedAlt, faEllipsisV, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { Text } from '../components/generic/Text';

interface Props {
    animTop: Animated.Value;
    animBottom: Animated.Value;
    inputs: {
        origin: { value: string, setter: (val: string) => void }
        destination: { value: string, setter: (val: string) => void }
    };
    changeInput: (inputToModify: string) => void;
    goBackToMap: () => void;
    startNavigation: () => void;
    getActualLocation: () => void;
    switchAddresses: () => void;
    distance: string;
    duration: string;
}

export const ConfirmRouteComponent = ({
    animTop,
    animBottom,
    inputs,
    changeInput,
    goBackToMap,
    startNavigation,
    getActualLocation,
    switchAddresses,
    distance,
    duration
}: Props): JSX.Element => {

    return (
        <>
            {/*
                ****** TOP RECTANGLE CATEGORY ********
            */}
            <Animated.View
                style={[ style.TopRectangle, {
                    transform: [
                        {
                            translateY: animTop
                        }
                    ],
                }]}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row'
                    }}
                >
                    {/*
                        ****** RETURN BUTTON CATEGORY ********
                    */}
                    <TouchableOpacity
                        style={{
                            height: '100%',
                            width: 30,
                            alignItems: 'center',
                            marginLeft: 10
                        }}
                        onPress={() => {
                            goBackToMap();
                        }}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} size={18} color="black" style={{ marginTop: 10 }} /> 
                    </TouchableOpacity>
                    {/*
                        ****** DESIGN ICONS CATEGORY ********
                    */}
                    <View
                        style={{
                            flexDirection: 'column',
                            width: 30,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <FontAwesomeIcon icon={faLocationArrow} size={12} color="#4179B5" />
                        <FontAwesomeIcon icon={faEllipsisV} size={12} color="#B2B2B2" style={{ marginTop: 5, marginBottom: 5 }} />
                        <FontAwesomeIcon icon={faMapMarkedAlt} size={12} color="#EF4F4F" />
                    </View>
                    {/*
                        ****** TEXT INPUT CATEGORY ********
                    */}
                    <View
                        style={{
                            flex: 0.9,
                            flexDirection: 'row',
                        }}
                    >
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <TouchableOpacity
                                style={{
                                    width: '96%',
                                    height: 37,
                                    margin: 5,
                                    borderRadius: 7,
                                    borderWidth: 1,
                                    borderColor: "#E0E0E0",
                                }}
                                onPress={() => {
                                    changeInput('origin');
                                }}
                            >
                                <TextInput placeholder={"Votre point de départ"} value={inputs.origin.value} editable={false}
                                    style={{
                                        height: '100%',
                                        width: '95%',
                                        marginLeft: 5,
                                    }}
                                    
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    width: '96%',
                                    height: 37,
                                    margin: 5,
                                    borderRadius: 7,
                                    borderWidth: 1,
                                    borderColor: "#E0E0E0",
                                }}
                                onPress={() => {
                                    changeInput('destination');
                                }}
                            >
                                <TextInput placeholder={"Votre destination"} value={inputs.destination.value} editable={false}
                                    style={{
                                        height: '100%',
                                        width: '95%',
                                        marginLeft: 5
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    marginTop: 15
                                }}
                                onPress={() => {
                                    getActualLocation();
                                }}
                            >
                                <FontAwesomeIcon icon={faMapMarkerAlt} size={18} color={"#4179B5"} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    transform: [
                                        {
                                            rotateZ: '90deg'
                                        }
                                    ],
                                    marginBottom: 15
                                }}
                                onPress={() => {
                                    switchAddresses();
                                }}
                            >
                                <FontAwesomeIcon icon={faExchangeAlt} size={14} color={"#4c4c4c"} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Animated.View>

            {/*
                ****** BOTTOM RECTANGLE CATEGORY ********
            */}

            <Animated.View
                style={[style.BottomRectangle, {
                    transform: [
                        {
                            translateY: animBottom
                        }
                    ],
                }]}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            // backgroundColor: 'turquoise',
                            margin: 15
                        }}
                    >
                        <Text type="body" size="l" color="black">{duration}</Text>
                        <Text type="body" size="m" color="gray" style={{marginLeft: 5, marginTop: 5}}>({distance})</Text>
                    </View>
                    <View
                        style={{
                            width: 110,
                            height: 30,
                            backgroundColor: '#4179B5',
                            marginLeft: 15,
                            borderRadius: 15,
                            marginBottom: 5
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row'
                            }}
                        >
                            <FontAwesomeIcon icon={faLocationArrow} color={"white"} size={14} style={{ margin: 9, marginRight: 7 }} />
                            <TouchableOpacity
                                onPress={() => {
                                    startNavigation();
                                }}
                            >
                                <Text type="body" size="s" style={{ marginTop: 7 }} color="white">Commencer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </Animated.View>
        </>
    )
}

const style = StyleSheet.create({
    TopRectangle: {
        position: 'absolute',
        bottom: 0,
        top: 40,
        width: '90%',
        height: '15%',
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    },
    BottomRectangle: {
        position: 'absolute',
        backgroundColor: 'white',
        width: '100%',
        height: 100,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    }
})