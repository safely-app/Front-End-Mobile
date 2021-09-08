import React from 'react';
import {SafeAreaView, Text, Button, View, StyleSheet, TouchableOpacity} from 'react-native';
import {styles} from '../styles'
import MapView, {Marker, PROVIDER_GOOGLE, UrlTile} from 'react-native-maps';
import { SafeplaceInterface } from '../../types/safeplace';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';

interface Props {
    logout: () => void;
    username: string;
    latitude: number;
    longitude: number;
    altitude: number;
    safeplaces: SafeplaceInterface[]
}

const mapStyle = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
      },
      container: {
        height: "100%",
        width: "100%",
        backgroundColor: 'tomato'
      },
      map: {
        ...StyleSheet.absoluteFillObject
      }
   });

export const HomeComponent = ({logout, username, latitude, longitude, safeplaces, altitude}: Props): JSX.Element => {

    const mapView = React.createRef();
    return (
        <SafeAreaView style={styles.content}>
            <GooglePlacesAutocomplete
                placeholder='Search'
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                }}
                query={{
                    key: 'AIzaSyBg2Odl0mQ6nXka-qOnhbV235zitMpHPEE',
                    language: 'en',
                }}
                styles={{
                    container: {
                        zIndex: 9999,
                        marginTop: 45,
                    }
                }}
            />
            <MapView
                style={mapStyle.map}
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
                ref={mapView}
            >
                {safeplaces ? safeplaces.map((safeplace, index) => (
                    <Marker
                        coordinate={{latitude: parseFloat(safeplace.coordinate[0]), longitude: parseFloat(safeplace.coordinate[1])}}
                        key={safeplace._id}
                        title={safeplace.name}               
                    />
                )) : null }
                <MapViewDirections
                    origin={{latitude: 0, longitude: 0}}
                    destination={{latitude: 0, longitude: 0}}
                    apikey={"AIzaSyBg2Odl0mQ6nXka-qOnhbV235zitMpHPEE"}
                    precision={"high"}
                />
            </MapView>
            {/* <TouchableOpacity onPress={() => {mapView.current.animateToViewingAngle(45);}}><Text>Start</Text></TouchableOpacity> */}
            <TouchableOpacity onPress={() => {mapView.current.animateCamera({pitch: 45, heading: 0});}}><Text>Start</Text></TouchableOpacity>
        </SafeAreaView>
    )
}