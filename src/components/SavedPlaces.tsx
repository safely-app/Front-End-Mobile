import React from 'react';
import {SafeAreaView, ActivityIndicator, Dimensions, View, Modal, ScrollView, TouchableOpacity, Keyboard} from 'react-native';
import { Text, Button, HLine, TextInput } from '../components';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMapPin, faEllipsisH, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

interface RecurringPlace {
    __v: number;
    _id: string;
    address: string;
    city: string;
    coordinate: Array<string>;
    createdAt: string;
    name: string;
    updatedAt: string;
}

interface Props {
    recurringPlaces: [];
    modalRecurring: boolean;
    setModalRecurring: (bool: boolean) => void; 
    safeplaceEditing: RecurringPlace;
    setSafeplaceEdit: (obj: RecurringPlace) => void;
    addressInput: string;
    setAddressInput: (text: string) => void;
    addressPlaces: [];
    getOriginPlaces: (text: string, latitude: number, longitude: number) => void;
    addressInputFocus: boolean;
    setAddressInputFocus: (bool: boolean) => void;
    nameInput: string,
    setNameInput: (name: string) => void;
    cityInput: string,
    setCityInput: (city: string) => void;
    editPlace: (idPlace: string, name: string, address: string, city: string, coordinate: Array<string>) => void;
    refreshRecurringPlace: () => void;
}

export const SavedPlacesComponent = ({refreshRecurringPlace, editPlace, cityInput, setCityInput, nameInput, setNameInput, addressInputFocus, setAddressInputFocus, addressInput, setAddressInput, addressPlaces, getOriginPlaces, safeplaceEditing, setSafeplaceEdit, modalRecurring, setModalRecurring, recurringPlaces}: Props): JSX.Element => {

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{display: 'flex', flexDirection: 'row', margin: (windowWidth/windowHeight)*30, justifyContent: 'space-between'}}>
                    <Text type="h1" color="blue" size="xl">Saved places</Text>
                    <TouchableOpacity
                        onPress={() => {setModalRecurring(true)}}
                    >
                        <FontAwesomeIcon icon={faPlusCircle} size={(windowHeight/windowWidth)*30} color="#1E90FF" />
                    </TouchableOpacity>
                </View>
                {recurringPlaces && recurringPlaces.length > 0 && recurringPlaces.map((place, index) => {
                    return (
                        <>
                            <View style={{display: 'flex', justifyContent: 'space-between', flex: 1, flexDirection: 'row'}}>
                                <View key={index} style={{display: 'flex', flexDirection: 'row', marginTop: windowWidth*0.1}}>
                                    <FontAwesomeIcon style={{margin: windowWidth*0.02, marginRight: windowWidth*0.06}} icon={faMapPin} size={(windowHeight/windowWidth)*10} color="#1E90FF" />
                                    <View key={"titleaddress" + index} style={{display: 'flex', flexDirection: 'column'}}>
                                        <Text type="h1" color="black" size="m">{place.name}</Text>
                                        <Text type="body" color="black" size="s">{place.address}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    onPress={() => {setModalRecurring(true); setSafeplaceEdit(place);setAddressInput(place.address);setNameInput(place.name);setCityInput(place.city)}}
                                >
                                    <FontAwesomeIcon style={{margin: windowWidth*0.02, marginRight: windowWidth*0.06, marginTop: windowWidth*0.12}} icon={faEllipsisH} size={(windowHeight/windowWidth)*10} color="#000" />
                                </TouchableOpacity>
                            </View>
                            <View key={"line" + index} style={{alignSelf: 'stretch', borderBottomWidth: 0.2, borderBottomColor: 'lightgray', width: '100%', marginTop: windowWidth*0.04}} />
                        </>
                    )
                })}
                <Modal
                    visible={modalRecurring}
                    animationType={"slide"}
                    transparent={true}
                >
                    <TouchableOpacity
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', flex: 1,justifyContent:'center' }}
                        onPress={() => {setModalRecurring(!modalRecurring)}}>

                        <View style={{backgroundColor: 'white', width: windowWidth*0.8, height: windowHeight*0.45, alignSelf: 'center', borderRadius: windowHeight*0.03, alignItems: 'center', top: windowHeight*0}}>
                            <Text style={{marginTop: (windowWidth*0.05)}} type="h1" color="black" size="l">{safeplaceEditing && safeplaceEditing.name.length > 0 ? "Modifier votre place" : "Nouvelle place"}</Text>
                            <TextInput
                                placeholder="Nom"
                                width="80%"
                                // height="35%"
                                value={nameInput}
                                onChangeText={(text) => {
                                    setNameInput(text);
                                }}
                                type="roundedTextInput"
                                bgColor="lightBlue"
                                style={{textAlignVertical: 'top', marginTop: 20}}
                                multiline={true}
                                testID="inputNameRecurringPlace"
                            />
                            <TextInput
                                placeholder="Address"
                                width="80%"
                                // height="35%"
                                value={addressInput}
                                onChangeText={(text) => {
                                    setAddressInput(text);
                                    getOriginPlaces(text, 0, 0);
                                }}
                                type="roundedTextInput"
                                bgColor="lightBlue"
                                style={{textAlignVertical: 'top', marginTop: 20}}
                                onFocus={() => {setAddressInputFocus(true)}}
                                multiline={true}
                                testID="inputAddressRecurringPlace"
                            />
                            {addressInputFocus && (
                                <ScrollView style={(addressPlaces.length > 0 && addressInputFocus) ? {position: 'absolute', top: (windowHeight)*0.230, bottom: 0, left: (windowWidth)*0.08, right: 0, backgroundColor: '#D6E0EC', width: windowWidth*0.64, height: windowHeight*0.25, borderBottomLeftRadius: 25, borderBottomRightRadius: 25} : {}} contentContainerStyle={{margin: 20}}>
                                    {(addressPlaces.length > 0 && addressInputFocus) && addressPlaces.map((place, index) => (
                                        <View key={"view" + index}>
                                            
                                            <TouchableOpacity
                                                onPress={() => {setAddressInput(place.description); setAddressInputFocus(false);  Keyboard.dismiss()}}
                                                key={index} 
                                                style={{zIndex: 9999, marginBottom: 10}}
                                                >
                                                <Text
                                                >
                                                    {place.description}
                                                </Text>
                                            </TouchableOpacity>
                                            
                                            <View key={"line" + index} style={{alignSelf: 'stretch', borderBottomWidth: 0.2, borderBottomColor: 'lightgray', width: '100%', marginBottom: 15}} />
                                        
                                        </View>
                                    ))}
                                </ScrollView>
                            )}
                            {!addressInputFocus && (
                                <>
                                    <TextInput
                                        placeholder="City"
                                        width="80%"
                                        // height="35%"
                                        value={cityInput}
                                        onChangeText={(text) => {
                                            setCityInput(text);
                                        }}
                                        type="roundedTextInput"
                                        bgColor="lightBlue"
                                        style={{textAlignVertical: 'top', marginTop: 20}}
                                        multiline={true}
                                        testID="inputAddressRecurringPlace"
                                    />
                                    <Button
                                        style={{alignItems: 'center', justifyContent: 'center', marginTop: 30}}
                                        width="80%"
                                        type="roundedButton"
                                        bgColor="blue"
                                        testID="buttonSendRecurringPlace"
                                        onPress={() => {
                                            if (safeplaceEditing && safeplaceEditing.name.length > 0) {
                                                editPlace(safeplaceEditing._id, nameInput, addressInput, cityInput, safeplaceEditing.coordinate);
                                                setModalRecurring(false);
                                                refreshRecurringPlace();
                                            }
                                        }}
                                    >
                                        <Text type="body" color="white" size="m">Finir</Text>
                                    </Button>
                                </>
                            )}
                        </View>
                    </TouchableOpacity>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    )
}
