import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Dimensions, ScrollView, TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native';
import MapView, {LatLng, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { SafeplaceInterface } from '../../types/safeplace';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faDirections, faLocationArrow, faCircle, faMapPin, faStore } from '@fortawesome/free-solid-svg-icons'

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
}

const mapStyle = StyleSheet.create({
      placesInput: {
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
      },
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
      originInput: {
        
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

export const HomeComponent = ({setOriginInput, setDestinationInput, originInput, originPlaces, destinationInput, getOriginPlaces, originFocus, destinationFocus, setOriginFocus, setDestinationFocus, destinationPlaces, setCoordsFromPlace, navigationMode, setNavigationMode, isMapLoaded, setIsMapLoaded, latitude, longitude, safeplaces, permissions, origin, destination, setOrigin, setDestination}: Props): JSX.Element => {

    const mapView = React.createRef();

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return (
        <>
            <View style={mapStyle.container}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={mapStyle.map}
                    region={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                    onMapReady={() => {setIsMapLoaded(true)}}
                >
                    {isMapLoaded && (
                        <Marker
                            coordinate={{latitude: latitude, longitude: longitude}}
                            key={"Person"}
                        >
                            <FontAwesomeIcon icon={faLocationArrow} />
                        </Marker>
                    )}
                    {isMapLoaded && safeplaces && safeplaces.length > 0 ? safeplaces.map((safeplace, index) => (
                            <Marker
                                coordinate={{latitude: parseFloat(safeplace.coordinate[0]), longitude: parseFloat(safeplace.coordinate[1])}}
                                key={safeplace._id}
                                title={safeplace.name}               
                            />
                    )) : null }
                </MapView>
            </View>
            {isMapLoaded && (
                <View style={{position: 'absolute', top: (windowHeight)*0.70, bottom: windowHeight*0, left: windowWidth*0.85, right: 0}}>
                    <TouchableOpacity style={{position: 'absolute', left: 0, bottom: (windowWidth)*0.15}}>
                            <FontAwesomeIcon icon={faDirections} color={"white"} size={(windowWidth/windowHeight)*55} style={{zIndex: 9999, left: (windowWidth)*0.0165, bottom: (windowHeight)*0.0135}} />
                            <FontAwesomeIcon icon={faCircle} color={"#1E90FF"} size={(windowWidth/windowHeight)*80} style={{bottom: 45}} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{position: 'absolute', left: 0, bottom: (windowWidth)*-0.11}}>
                            <FontAwesomeIcon icon={faMapPin} color={"white"} size={(windowWidth/windowHeight)*60} style={{zIndex: 9999, left: (windowWidth)*0.0140, bottom: (windowHeight)*0.0100}} />
                            <FontAwesomeIcon icon={faCircle} color={"#1E90FF"} size={(windowWidth/windowHeight)*80} style={{bottom: 45}} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{position: 'absolute', left: 0, bottom: (windowWidth)*0.022}}>
                            <FontAwesomeIcon icon={faStore} color={"white"} size={(windowWidth/windowHeight)*55} style={{zIndex: 9999, left: (windowWidth)*0.0185, bottom: (windowHeight)*0.0135}} />
                            <FontAwesomeIcon icon={faCircle} color={"#EF4F4F"} size={(windowWidth/windowHeight)*80} style={{bottom: 45}} />
                    </TouchableOpacity>
                </View>
            )}
            {isMapLoaded && (
                <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss(); originFocus ? setOriginFocus(false) : null; destinationFocus ? setDestinationFocus(false) : null}} accessible={false}>
                    <View style={{alignItems: 'center', position: 'absolute', top: (windowHeight)*0.05, bottom: originFocus || destinationFocus ? 0 : (windowHeight)*0.700, left: originFocus || destinationFocus ? 0 : (windowWidth)*0.18, right: originFocus || destinationFocus ? 0 : (windowWidth)*0.18}}>
                        <TextInput
                            placeholder="Origin"
                            style={{backgroundColor: 'white', height: (windowHeight)*0.065, width: (windowWidth)*0.6, top: (windowHeight)*0.02, shadowColor: "#000", elevation: 15}}
                            value={originInput}
                            onChangeText={(text) => {setOriginInput(text); getOriginPlaces(text, latitude, longitude, "origin");}}
                            onFocus={() => {setOriginFocus(true)}}
                        />

                        {originInput.length > 0 && (
                            <TextInput
                                placeholder="Destination"
                                style={{backgroundColor: 'white', height: (windowHeight)*0.065, width: (windowWidth)*0.6, top: (windowHeight)*0.04, shadowColor: "#000", elevation: 15}}
                                value={destinationInput}
                                onChangeText={(text) => {setDestinationInput(text); getOriginPlaces(text, latitude, longitude, "destination")}}
                                onFocus={() => {setDestinationFocus(true)}}
                            />
                        )}

                        {originFocus && (
                            <ScrollView style={(originPlaces.length > 0 && originFocus) ? {position: 'absolute', top: (windowHeight)*0.085, bottom: 0, left: (windowWidth)*0.20, right: 0, backgroundColor: 'white', width: '60%', height: '40%', borderBottomLeftRadius: 25, borderBottomRightRadius: 25} : {}} contentContainerStyle={{margin: 20}}>
                                {(originPlaces.length > 0 && originFocus) && originPlaces.map((place, index) => (
                                    <View key={"view" + index}>
                                        
                                        <TouchableOpacity
                                            onPress={() => {setOriginInput(place.description); setOriginFocus(false); setCoordsFromPlace(place.description, "origin"); Keyboard.dismiss()}}
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
                        {destinationFocus && (
                            <ScrollView style={(destinationPlaces.length > 0 && destinationFocus) ? {position: 'absolute', top: (windowHeight)*0.170, bottom: 0, left: (windowWidth)*0.20, right: 0, backgroundColor: 'white', width: '60%', height: '40%', borderBottomLeftRadius: 25, borderBottomRightRadius: 25} : {}} contentContainerStyle={{margin: 20}}>
                
                                    {(destinationPlaces.length > 0 && destinationFocus) && destinationPlaces.map((place, index) => (
                                        <View key={"view" + index}>
                                            
                                            <TouchableOpacity
                                                onPress={() => {setDestinationInput(place.description); setDestinationFocus(false); setCoordsFromPlace(place.description, "destination")}}
                                                key={index} 
                                                style={{zIndex: 9999, marginBottom: 10}}
                                            >
                                                <Text>
                                                    {place.description}
                                                </Text>
                                            </TouchableOpacity>
            
                                            <View key={"line" + index} style={{alignSelf: 'stretch', borderBottomWidth: 0.2, borderBottomColor: 'lightgray', width: '100%', marginBottom: 15}} />
                                        
                                        </View>
                                    ))}
                            </ScrollView>
                        )}
                    </View>
                </TouchableWithoutFeedback>
            )}
        </>
        // <SafeAreaView>
        //     <View style={mapStyle.placesInput}>
        //         <GooglePlacesAutocomplete
        //             placeholder='Origin'
        //             fetchDetails={true}
        //             // currentLocation={true}
        //             // currentLocationLabel='Current location'
        //             onPress={(data, details = null) => {
        //                 const lat = details?.geometry.location.lat ? details.geometry.location.lat : 0;
        //                 const lng = details?.geometry.location.lng ? details.geometry.location.lng : 0;
        //                 setOrigin({latitude: lat, longitude: lng})

        //             }}
        //             query={{
        //                 key: 'AIzaSyBg2Odl0mQ6nXka-qOnhbV235zitMpHPEE',
        //                 language: 'en',
        //             }}
        //             styles={{
        //                 container: {
        //                     zIndex: 9999,
        //                     width: '80%',
        //                     shadowColor: "#000",
        //                     shadowOffset: {
        //                         width: 0,
        //                         height: 2,
        //                     },
        //                     shadowOpacity: 0.25,
        //                     shadowRadius: 3.84,

        //                     elevation: 5,
        //                     // marginTop: 50,
        //                 },
        //                 listView: {
        //                     position: 'absolute',
        //                     zIndex: 9999,
        //                     top: 40,
        //                 }
        //             }}
        //         />
        //         {(origin.latitude !== 0 && origin.longitude !== 0) && (
        //             <GooglePlacesAutocomplete
        //                 placeholder='Destination'
        //                 fetchDetails={true}
        //                 // currentLocation={true}
        //                 // currentLocationLabel='Current location'
        //                 onPress={(data, details = null) => {
        //                     const lat = details?.geometry.location.lat ? details.geometry.location.lat : 0;
        //                     const lng = details?.geometry.location.lng ? details.geometry.location.lng : 0;
        //                     setDestination({latitude: lat, longitude: lng})
        //                 }}
        //                 query={{
        //                     key: 'AIzaSyBg2Odl0mQ6nXka-qOnhbV235zitMpHPEE',
        //                     language: 'en',
        //                 }}
        //                 styles={{
        //                     container: {
        //                         zIndex: 9999,
        //                         marginTop: 60,
        //                         width: '80%',
        //                         shadowColor: "#000",
        //                         shadowOffset: {
        //                             width: 0,
        //                             height: 2,
        //                         },
        //                         shadowOpacity: 0.25,
        //                         shadowRadius: 3.84,
    
        //                         elevation: 5,
        //                     },
        //                     listView: {
        //                         position: 'absolute',
        //                         zIndex: 9999,
        //                         top: 40,
        //                     }
        //                 }}
        //             />
        //         )}
        //     </View>
        //     {(permissions && latitude != 0 && longitude != 0) && (
        //         <View style={mapStyle.container}>
        //             <MapView
        //                 style={mapStyle.map}
        //                 initialRegion={{
        //                     latitude: latitude,
        //                     longitude: longitude,
        //                     latitudeDelta: 0.0922,
        //                     longitudeDelta: 0.0421,
        //                 }}
        //                 ref={mapView}
        //             >
        //                 <Marker
        //                     coordinate={{latitude: latitude, longitude: longitude}}
        //                     key={"Person"}
        //                 >
        //                     <FontAwesomeIcon icon={faLocationArrow} />
        //                 </Marker>
        //                 {safeplaces ? safeplaces.map((safeplace, index) => (
        //                     <Marker
        //                         coordinate={{latitude: parseFloat(safeplace.coordinate[0]), longitude: parseFloat(safeplace.coordinate[1])}}
        //                         key={safeplace._id}
        //                         title={safeplace.name}               
        //                     />
        //                 )) : null }
        //                 {(origin.latitude !== 0 && origin.longitude !== 0) && (destination.latitude !== 0 && destination.longitude !== 0) && (
        //                     <MapViewDirections
        //                         origin={{latitude: origin.latitude, longitude: origin.longitude}}
        //                         destination={{latitude: destination.latitude, longitude: destination.longitude}}
        //                         apikey={"AIzaSyBg2Odl0mQ6nXka-qOnhbV235zitMpHPEE"}
        //                         precision={"high"}
        //                     />
        //                 )}
        //             </MapView>
        //         </View>
        //     )}
        //     <View style={mapStyle.debugContainer}>
        //         <TouchableOpacity onPress={() => {mapView.current.animateCamera({pitch: 45, heading: 0});}}><Text>Start</Text></TouchableOpacity>
        //         <TouchableOpacity onPress={() => {mapView.current.animateCamera({center: {latitude: latitude, longitude: longitude}});}}><Text>ReCenter</Text></TouchableOpacity>
        //         <TouchableOpacity onPress={() => {logout()}}><Text>Logout</Text></TouchableOpacity>
        //     </View>
        // </SafeAreaView>
    )
}