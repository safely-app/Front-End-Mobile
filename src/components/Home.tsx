import React, { LegacyRef, RefObject, useEffect } from 'react';
import {View, StyleSheet, TouchableOpacity, Dimensions, ScrollView, TextInput, TouchableWithoutFeedback, Keyboard, Platform} from 'react-native';
import {LatLng, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapView from "react-native-map-clustering";
import { SafeplaceInterface } from '../../types/safeplace';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faDirections, faLocationArrow, faCircle, faMapPin, faStore, faMoon } from '@fortawesome/free-solid-svg-icons'
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_API_KEY} from '@env';
import {theme} from '../styles';
import { Text } from '../components/generic/Text';

interface Props {
    latitude: number;
    longitude: number;
    safeplaces: SafeplaceInterface[];
    permissions: boolean;
    origin: LatLng;
    destination: LatLng;
    setOrigin: (obj: LatLng) => void;
    setDestination: (obj: LatLng) => void;
    isMapLoaded: boolean;
    setIsMapLoaded: (bool: boolean) => void;
    setOriginInput: (origin: string) => void;
    setDestinationInput: (destination: string) => void;
    originInput: string;
    originPlaces: [];
    destinationInput: string;
    getOriginPlaces: (text: string, latitude: number, longitude: number, input: String) => void;
    destinationFocus: boolean;
    originFocus: boolean;
    setOriginFocus: (bool: boolean) => void;
    setDestinationFocus: (bool: boolean) => void;
    destinationPlaces: [];
    setCoordsFromPlace: (address: string, type: string) => void;
    navigationMode: boolean;
    setNavigationMode: (bool: boolean) => void;
    goToSafeplace: (id: string) => void;
    count: number;
    setCount: (number: number) => void;
    getNearestSafe: () => void;
    goToInputAddress: () => void;
}

const mapStyle = StyleSheet.create({
      container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
    destinationInput: {
      width: '80%',
      marginTop: 10,
      backgroundColor: "white",
    //   borderRadius: 25,
      shadowColor: "#000",
      shadowOffset: {
        width: 2,
        height: 0,
     },
     shadowOpacity: 0.25,
     shadowRadius: 15.84,
     elevation: 2,
    },
    originPlace: {
        backgroundColor: "white",
        width: '80%',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        height: '87%',
        position: 'absolute',
        top: 48
    },
    destinationPlace: {
      backgroundColor: "white",
      width: '80%',
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      height: '70%',
      position: 'absolute',
      top: 100
    }
   });

export const HomeComponent = ({goToInputAddress, getNearestSafe, count, setCount, goToSafeplace, setOriginInput, setDestinationInput, originInput, originPlaces, destinationInput, getOriginPlaces, originFocus, destinationFocus, setOriginFocus, setDestinationFocus, destinationPlaces, setCoordsFromPlace, navigationMode, setNavigationMode, isMapLoaded, setIsMapLoaded, latitude, longitude, safeplaces, permissions, origin, destination, setOrigin, setDestination}: Props): JSX.Element => {

    const mapView = React.createRef();
    let destinationRef: TextInput | null;

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

     
    if (latitude !== 0 && longitude !== 0) {
        return (
            <>
                <View style={mapStyle.container}>
                    <MapView
                        provider={null}
                        style={mapStyle.map}
                        ref={mapView}
                        initialRegion={{
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                        onMapReady={() => {
                            if (count === 0) {
                                setIsMapLoaded(true);
                                mapView.current.animateCamera({center: {latitude: latitude, longitude: longitude}})
                            }
                            setCount(count++);
                        }}
                        onRegionChange={() => {
                            Keyboard.dismiss()
                        }}
                        onTouchStart={() => {
                            Keyboard.dismiss()
                        }}
                    >
                        {isMapLoaded && (
                            <Marker
                                coordinate={{latitude: latitude, longitude: longitude}}
                                key={"Person"}
                            >
                                <FontAwesomeIcon icon={faLocationArrow} size={24} color="steelblue" />
                            </Marker>
                        )}
                        {isMapLoaded && safeplaces && safeplaces.length > 0 ? safeplaces.map((safeplace, index) => (
                                <Marker
                                    coordinate={{latitude: parseFloat(safeplace.coordinate[0]), longitude: parseFloat(safeplace.coordinate[1])}}
                                    key={safeplace._id}
                                    title={safeplace.name}
                                    onPress={() => {goToSafeplace(safeplace._id);}}
                                    tracksViewChanges={false}
                                />
                        )) : null }
                        {(isMapLoaded && navigationMode && origin && origin.latitude !== 0 && origin.longitude !== 0) && (destination && destination.latitude !== 0 && destination.longitude !== 0) && (
                            <MapViewDirections
                                origin={{latitude: origin.latitude, longitude: origin.longitude}}
                                destination={{latitude: destination.latitude, longitude: destination.longitude}}
                                apikey={GOOGLE_API_KEY}
                                precision={"high"}
                                strokeWidth={3}
                                strokeColor={"dodgerblue"}
                            />
                        )}
                    </MapView>
                    {isMapLoaded ? (
                        <View style={{position: 'absolute', left: "82%", bottom: "5%"}}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: theme.colors.steelBlue,
                                    width: 50,
                                    height: 50,
                                    borderRadius: 50,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                onPress={() => {setNavigationMode(!navigationMode)}}
                            >
                                <FontAwesomeIcon icon={faDirections} color={"white"} size={18} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: theme.colors.steelBlue,
                                    width: 50,
                                    height: 50,
                                    borderRadius: 50,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 5
                                }}
                                onPress={() => {
                                    mapView.current.animateCamera({
                                        center: { latitude: latitude, longitude: longitude }
                                    });
                                }}
                            >
                                <FontAwesomeIcon icon={faMapPin} color={"white"} size={18} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: theme.colors.red,
                                    width: 50,
                                    height: 50,
                                    borderRadius: 50,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 5
                                }}
                                onPress={() => {
                                    getNearestSafe();
                                }}
                            >
                                <FontAwesomeIcon icon={faStore} color={"white"} size={18} />
                            </TouchableOpacity>
                        </View>
                    ) : null}
                    {isMapLoaded ? (
                        <TouchableOpacity 
                            style={{
                                position: 'absolute',
                                width: '90%',
                                height: '7%',
                                backgroundColor: 'white',
                                bottom: 0,
                                top: "8%",
                                borderRadius: 35,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.8,
                                shadowRadius: 2,
                                elevation: 5
                            }}
                            onPress={() => {
                                goToInputAddress();
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row'
                                }}
                            >
                                <View
                                    style={{
                                        width: '10%',
                                        height: '100%',
                                        marginLeft: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <FontAwesomeIcon icon={faMoon} color={"#4179B5"} size={18} />
                                </View>
                                <View
                                    style={{
                                        width: '80%',
                                        height: '100%',
                                        marginLeft: 10,
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Text type="body" style={{
                                        color: "#a9a9a9"
                                    }}>Rechercher une adresse</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ) : null}
                    {/* {isMapLoaded ? (
                            <View
                                style={{
                                    position: 'absolute',
                                    backgroundColor: 'green',
                                    // The most cursed ternary I've ever done :x
                                    bottom: originInput.length > 0 && originPlaces.length > 0 && originFocus ? '63.5%' : destinationInput.length > 0 && destinationPlaces.length > 0 && destinationFocus ? '60%' : '80%',
                                    flex: 1,
                                    // bottom: '80%',
                                    width: '90%',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <TextInput
                                    style={{
                                        width: "100%",
                                        height: 40,
                                        backgroundColor: "red",
                                        borderRadius: 25
                                    }}
                                    value={originInput}
                                    onFocus={() => { setOriginFocus(true); setDestinationFocus(false); }}
                                    onChangeText={(text) => { 
                                        setOriginInput(text);
                                        getOriginPlaces(text, latitude, longitude, "origin");
                                    }}
                                    onSubmitEditing={() => {
                                        setOriginFocus(false);
                                        if (destinationRef) {
                                            destinationRef.focus();
                                        }
                                    }}
                                >
                                </TextInput>

                                {originFocus && originInput.length > 0 && originPlaces.length > 0 ? (
                                    <ScrollView
                                        style={{
                                            width: '95%',
                                            backgroundColor: 'white',
                                            borderRadius: 5,
                                            height: 100
                                        }}
                                        keyboardShouldPersistTaps={'always'}
                                        contentContainerStyle={{
                                            margin: 10,
                                            marginBottom: 0,
                                            marginTop: 0
                                        }}
                                    >
                                        {originPlaces.map((place, index) => (
                                            <View
                                                key={index}
                                            >
                                                <Text
                                                    style={{
                                                        marginTop: 5,
                                                        backgroundColor: 'purple'
                                                    }}
                                                    onPress={() => {
                                                        setOriginInput(place.description);
                                                        setOriginFocus(false);
                                                        setCoordsFromPlace(place.description, "origin");
                                                        if (destinationRef)
                                                            destinationRef.focus();
                                                    }}
                                                >
                                                    {place.description}
                                                </Text>

                                            </View>
                                        ))}
                                    </ScrollView>
                                ) : null}
                                <TextInput
                                    style={{
                                        width: "100%",
                                        height: 40,
                                        backgroundColor: "blue",
                                        borderRadius: 25,
                                        marginTop: 10
                                    }}
                                    value={destinationInput}
                                    onFocus={() => { setDestinationFocus(true); setOriginFocus(false); }}
                                    onChangeText={(text) => { 
                                        setDestinationInput(text);
                                        getOriginPlaces(text, latitude, longitude, "destination");
                                    }}
                                    ref={(ref) => {destinationRef = ref}}
                                >
                                </TextInput>

                                {destinationFocus && destinationInput.length > 0 && destinationPlaces.length > 0 ? (
                                    <ScrollView
                                        style={{
                                            width: '95%',
                                            backgroundColor: 'white',
                                            borderRadius: 5,
                                            height: 100
                                        }}
                                        keyboardShouldPersistTaps={'always'}
                                        contentContainerStyle={{
                                            margin: 10,
                                            marginBottom: 0,
                                            marginTop: 0
                                        }}
                                    >
                                        {destinationPlaces.map((place, index) => (
                                            <View
                                                key={index}
                                            >
                                                <Text
                                                    style={{
                                                        marginTop: 5,
                                                        backgroundColor: 'purple'
                                                    }}
                                                    onPress={() => {
                                                        setDestinationInput(place.description);
                                                        setDestinationFocus(false);
                                                        setCoordsFromPlace(place.description, "destination");
                                                        Keyboard.dismiss()
                                                    }}
                                                >
                                                    {place.description}
                                                </Text>

                                            </View>
                                        ))}
                                    </ScrollView>
                                ) : null}
                            </View>
                    ) : null} */}
                </View>
            </>
        )
    } else {
        return (<Text></Text>);
    }
}