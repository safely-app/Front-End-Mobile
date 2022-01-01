import React from 'react';
import {View, StyleSheet, TouchableOpacity, Keyboard, Animated} from 'react-native';
import {LatLng, Marker} from 'react-native-maps';
import MapView from "react-native-map-clustering";
import { SafeplaceInterface } from '../../types/safeplace';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faDirections, faLocationArrow, faMapPin, faStore, faMoon } from '@fortawesome/free-solid-svg-icons'
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_API_KEY} from '@env';
import {theme} from '../styles';
import { Text } from '../components/generic/Text';
import { ConfirmRoute } from '../containers';
import { State } from '../../types/general';

interface Props {
    latitude: number;
    longitude: number;
    safeplaces: SafeplaceInterface[];
    isMapLoaded: boolean;
    setIsMapLoaded: (bool: boolean) => void;
    goToSafeplace: (id: string) => void;
    getNearestSafe: () => void;
    goToInputAddress: (inputToModify: string) => void;
    routingCoordinates: {
        origin: { latitude: number, longitude: number, setter: (obj: LatLng) => void },
        destination: { latitude: number, longitude: number, setter: (obj: LatLng) => void }
    };
    routingInputs: {
        origin: { value: string, setter: (input: string) => void },
        destination: { value: string, setter: (input: string) => void }
    }
    mapState: {
        value: number,
        setter: (val: State) => void;
    },
    inputAnim: Animated.Value;
}

export const HomeComponent = ({
    goToInputAddress,
    getNearestSafe,
    goToSafeplace,
    isMapLoaded,
    setIsMapLoaded,
    latitude,
    longitude,
    safeplaces,
    routingCoordinates,
    routingInputs,
    mapState,
    inputAnim
}: Props): JSX.Element => {

    const mapView = React.createRef<MapView>();

    if (latitude !== 0 && longitude !== 0) {
        return (
            <>
                <View style={mapStyle.container}>
                    {/*
                        ****** MAP CATEGORY ********
                    */}
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
                            setIsMapLoaded(true);
                            if (mapView && mapView.current)
                                mapView.current.animateCamera({center: {latitude: latitude, longitude: longitude}})
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
                                    coordinate={{latitude: parseFloat(safeplace && safeplace.coordinate ? safeplace.coordinate[0] : ''), longitude: parseFloat(safeplace && safeplace.coordinate ? safeplace.coordinate[1] : '')}}
                                    key={safeplace._id}
                                    title={safeplace.name}
                                    onPress={() => {goToSafeplace(safeplace._id);}}
                                    tracksViewChanges={false}
                                />
                        )) : null }
                        {isMapLoaded && mapState.value === State.NAVIGATION ? (
                            <MapViewDirections apikey={GOOGLE_API_KEY} precision={"high"} strokeWidth={3} strokeColor={"dodgerblue"}
                                origin={{
                                    latitude: routingCoordinates.origin.latitude,
                                    longitude: routingCoordinates.origin.longitude
                                }}
                                destination={{
                                    latitude: routingCoordinates.destination.latitude,
                                    longitude: routingCoordinates.destination.longitude
                                }}
                            />
                        ) : null}
                    </MapView>
                    {/*
                        ****** 3 BUTTONS BOTTOM RIGHT OF MAP ********
                    */}
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
                                onPress={() => {
                                    if (mapState.value === State.NAVIGATION)
                                        mapState.setter(State.MAP)
                                    else
                                        mapState.setter(State.NAVIGATION)
                                }}
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
                                    if (mapView && mapView.current)
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
                    {/*
                        ****** TEXT INPUT FOR DESTINATION ********
                    */}
                    {isMapLoaded ? (
                        <>
                            <Animated.View
                                style={{
                                    width: '90%',
                                    height: '7%',
                                    position: 'absolute',
                                    transform: [
                                        {
                                            translateY: inputAnim
                                        }
                                    ],
                                    top: "8%",
                                    bottom: 0,
                                }}
                            >
                                <TouchableOpacity 
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: 'white',
                                        borderRadius: 35,
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 1 },
                                        shadowOpacity: 0.8,
                                        shadowRadius: 2,
                                        elevation: 5,
                                    }}
                                    onPress={() => {
                                        goToInputAddress('destination');
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
                            </Animated.View>
                            {/*
                                ****** CONFIRM ROUTING WHEN SELECTING DESTINATION ADDRESS ********
                            */}
                            <ConfirmRoute
                                mapState={mapState}
                                routingInputs={routingInputs}
                                goToInputAddress={goToInputAddress}
                                actualLocation={{
                                    latitude: latitude,
                                    longitude: longitude
                                }}
                                routingCoordinates={routingCoordinates}
                            />
                        </>
                    ) : null}
                </View>
            </>
        )
    } else {
        return (<Text></Text>);
    }
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
});