import React from 'react';
import {SafeAreaView, Text, Button, View, StyleSheet, TouchableOpacity} from 'react-native';
import {styles} from '../styles'
import MapView, {LatLng, Marker, PROVIDER_GOOGLE, UrlTile} from 'react-native-maps';
import { SafeplaceInterface } from '../../types/safeplace';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBullseye, faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/core';

interface Props {
    logout: () => void;
    username: string;
    latitude: number;
    longitude: number;
    altitude: number;
    safeplaces: SafeplaceInterface[];
    permissions: boolean;
    origin: LatLng;
    destination: LatLng;
    setOrigin: (obj: LatLng) => void;
    setDestination: (obj: LatLng) => void;
}

const mapStyle = StyleSheet.create({
      map: {
        ...StyleSheet.absoluteFillObject
      },
      placesInput: {
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
      },
      debugContainer: {
          display: 'flex',
          justifyContent: 'space-around',
          flexDirection: 'row',
          marginTop: "160%"
      }
   });

export const HomeComponent = ({logout, username, latitude, longitude, safeplaces, altitude, permissions, origin, destination, setOrigin, setDestination}: Props): JSX.Element => {

    const mapView = React.createRef();

    return (
        <SafeAreaView style={[styles.content, {justifyContent: 'flex-start'}]}>
            <View style={mapStyle.placesInput}>
                <GooglePlacesAutocomplete
                    placeholder='Origin'
                    fetchDetails={true}
                    // currentLocation={true}
                    // currentLocationLabel='Current location'
                    onPress={(data, details = null) => {
                        const lat = details?.geometry.location.lat ? details.geometry.location.lat : 0;
                        const lng = details?.geometry.location.lng ? details.geometry.location.lng : 0;
                        setOrigin({latitude: lat, longitude: lng})

                    }}
                    query={{
                        key: 'AIzaSyBg2Odl0mQ6nXka-qOnhbV235zitMpHPEE',
                        language: 'en',
                    }}
                    styles={{
                        container: {
                            zIndex: 9999,
                            width: '80%',
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,

                            elevation: 5,
                            // marginTop: 50,
                        },
                        listView: {
                            position: 'absolute',
                            zIndex: 9999,
                            top: 40,
                        }
                    }}
                />
                {(origin.latitude !== 0 && origin.longitude !== 0) && (
                    <GooglePlacesAutocomplete
                        placeholder='Destination'
                        fetchDetails={true}
                        // currentLocation={true}
                        // currentLocationLabel='Current location'
                        onPress={(data, details = null) => {
                            const lat = details?.geometry.location.lat ? details.geometry.location.lat : 0;
                            const lng = details?.geometry.location.lng ? details.geometry.location.lng : 0;
                            setDestination({latitude: lat, longitude: lng})
                        }}
                        query={{
                            key: 'AIzaSyBg2Odl0mQ6nXka-qOnhbV235zitMpHPEE',
                            language: 'en',
                        }}
                        styles={{
                            container: {
                                zIndex: 9999,
                                marginTop: 60,
                                width: '80%',
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
    
                                elevation: 5,
                            },
                            listView: {
                                position: 'absolute',
                                zIndex: 9999,
                                top: 40,
                            }
                        }}
                    />
                )}
            </View>
            {(permissions && latitude != 0 && longitude != 0) && (
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={mapStyle.map}
                    initialRegion={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    ref={mapView}
                >
                <Marker
                    coordinate={{latitude: latitude, longitude: longitude}}
                    key={"Person"}
                >
                    <FontAwesomeIcon icon={faLocationArrow} />
                </Marker>
                {safeplaces ? safeplaces.map((safeplace, index) => (
                    <Marker
                        coordinate={{latitude: parseFloat(safeplace.coordinate[0]), longitude: parseFloat(safeplace.coordinate[1])}}
                        key={safeplace._id}
                        title={safeplace.name}               
                    />
                )) : null }
                {(origin.latitude !== 0 && origin.longitude !== 0) && (destination.latitude !== 0 && destination.longitude !== 0) && (
                    <MapViewDirections
                        origin={{latitude: origin.latitude, longitude: origin.longitude}}
                        destination={{latitude: destination.latitude, longitude: destination.longitude}}
                        apikey={"AIzaSyBg2Odl0mQ6nXka-qOnhbV235zitMpHPEE"}
                        precision={"high"}
                    />
                )}
                </MapView>
            )}
            <View style={mapStyle.debugContainer}>
                <TouchableOpacity onPress={() => {mapView.current.animateCamera({pitch: 45, heading: 0});}}><Text>Start</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {mapView.current.animateCamera({center: {latitude: latitude, longitude: longitude}});}}><Text>ReCenter</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {logout()}}><Text>Logout</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}