
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import { faChevronLeft, faArrowUp, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from '../components/generic/Text'

interface Props {
    goBack: () => void;
    input: string;
    setInput: (input: string) => void;
    fetchPlacesSearch: (query: string) => void;
    places: [];
    setInputRef: (ref: TextInput | null) => void;
    chooseAddress: () => void;
}

export const InputAddressComponent = ({
    goBack,
    input,
    setInput,
    fetchPlacesSearch,
    places,
    setInputRef,
    chooseAddress
}: Props): JSX.Element => {

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'column'
            }}
        >
            {/*
                ****** TEXT INPUT CATEGORY ********
            */}
            <View
                style={{
                    width: '100%',
                    height: '10%',
                    marginTop: 45,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <View
                    style={{
                        width: '95%',
                        height: '50%',
                        flexDirection: 'row',
                        borderRadius: 25,
                        borderWidth: 0.5,
                        borderColor: 'black',
                    }}
                >
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: 10,
                            height: '100%',
                        }}
                        onPress={() => {
                            goBack();
                        }}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} size={22} color={"#a9a9a9"}/>
                    </TouchableOpacity>
                    <View
                        style={{
                            width: '85%',
                            height: '100%',
                            marginLeft: 10
                        }}
                    >
                        <TextInput placeholder='Rechercher' value={input} ref={(ref) => {setInputRef(ref)}}
                            style={{
                                width: '100%',
                                height: '100%'
                            }}
                            onChangeText={(text) => {
                                setInput(text);
                                fetchPlacesSearch(text);
                            }}
                        />
                    </View>
                </View>
            </View>
            {/*
                ****** GRAY DELIMITATION FOR STYLING ********
            */}
            <View
                style={{
                    width: '100%',
                    height: '2%',
                    backgroundColor: '#E0E0E0',
                }}
            >
            </View>
            {/*
                ****** PLACES SUGGESTIONS CATEGORY ********
            */}
            <View
                style={{
                    width: '100%',
                    height: '100%',
                    // backgroundColor: 'green',
                    alignItems: 'center'
                }}
            >
                <ScrollView
                    style={{
                        width: '95%',
                        height: '100%',
                        // backgroundColor: 'skyblue',
                        marginTop: 10
                    }}
                >
                    {places && places.results && places.results.length > 0 ? places.results.map((place, index) => (
                        <TouchableOpacity key={index}
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                width: '100%'
                            }}
                            onPress={() => {
                                chooseAddress(place.formatted_address);
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'column',
                                    margin: 10,
                                    marginLeft: 10,
                                    marginRight: 20
                                }}
                            >
                                <View
                                    style={{
                                        height: 35,
                                        width: 35,
                                        backgroundColor: 'lightgray',
                                        borderRadius: 50,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <FontAwesomeIcon icon={faMapMarkerAlt} size={16} color={"black"}/>
                                </View>
                            </View>
                            <View
                                style={{
                                    width: '75%',
                                    flexDirection: 'column'
                                }}
                            >
                                <Text type="body" size="m">{place.formatted_address}</Text>
                                <View 
                                    style={{
                                        width: '100%',
                                        height: '2%',
                                        backgroundColor: '#DCDCDC',
                                        marginTop: 10,
                                        marginBottom: 5
                                    }}
                                />
                            </View>
                            <View
                                style={{
                                    height: '100%',
                                    justifyContent: 'center',
                                    marginRight: 10
                                }}
                            >
                                <FontAwesomeIcon icon={faArrowUp}
                                    style={{
                                        transform: [{rotateZ: '-50deg'}]
                                    }}
                                />
                            </View>
                        </TouchableOpacity>
                    )) : (<Text type="body" size="m" style={{marginTop: 20}}>Aucun éléments à afficher</Text>)}

                </ScrollView>
                
            </View>
        </View>
    )
}
