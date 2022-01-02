import React, { useEffect, useState } from 'react';
import { ConfirmRouteComponent } from '../components';
import { Animated } from 'react-native'
import { State } from '../../types/general';
import { googleServices } from '../services';
import {LatLng} from 'react-native-maps';
import Toast from 'react-native-toast-message';
import { Dimensions } from 'react-native';

interface Props {
    mapState: {
        value: number,
        setter: (val: State) => void;
    };
    routingInputs: {
        origin: { value: string, setter: (input: string) => void },
        destination: { value: string, setter: (input: string) => void }
    };
    routingCoordinates: {
        origin: { latitude: number, longitude: number, setter: (obj: LatLng) => void },
        destination: { latitude: number, longitude: number, setter: (obj: LatLng) => void }
    };
    goToInputAddress: (inputToModify: string) => void;
    actualLocation: {
        latitude: number,
        longitude: number
    };
}

export const ConfirmRoute = ({
    mapState,
    routingInputs,
    goToInputAddress,
    actualLocation,
    routingCoordinates
}: Props): JSX.Element => {

    const [animTop, setValueAnim] = useState(new Animated.Value(-140));
    const [animBottom, setAnimBottom] = useState(new Animated.Value(100));
    const [duration, setDuration] = useState<string>('');
    const [distance, setDistance] = useState<string>('');
    const windowHeight = Dimensions.get('window').height;

    useEffect(() => {
        if (mapState.value === State.CONFIRMROUTE) {
            console.log(windowHeight)
            showTopComponent()
        } else {
            hideTopComponent()
            hideBottomComponent();
        }
    }, [mapState.value])

    useEffect(() => {
        if ((routingCoordinates.origin.latitude !== 0 && routingCoordinates.origin.longitude !== 0) &&
            (routingCoordinates.destination.latitude !== 0 && routingCoordinates.destination.longitude !== 0)) {
                googleServices.getDirections(routingCoordinates.origin, routingCoordinates.destination)
                .then((res) => {
                    if (!res.data.routes || !res.data.routes[0] || !res.data.routes[0].legs[0]) {
                        Toast.show({
                            type: 'error',
                            text1: "Une erreur est survenue lors du calcul d'itinéraire.",
                            text2: "Veuillez rédéfinir votre itinéraire."
                        });
                        return;
                    } else {
                        setDuration(res.data.routes[0].legs[0].duration.text);
                        setDistance(res.data.routes[0].legs[0].distance.text);
                        if (mapState.value === State.CONFIRMROUTE)
                            showBottomComponent();
                    }
                })
        } else
            hideBottomComponent();
    }, [routingCoordinates])

    const hideTopComponent = () => {
        Animated.spring(animTop, {
            toValue: -140,
            friction: 10,
            useNativeDriver: true
        }).start();
    }

    const hideBottomComponent = () => {
        Animated.spring(animBottom, {
            toValue: 100,
            friction: 10,
            useNativeDriver: true
        }).start();
    }

    const showTopComponent = () => {
        Animated.spring(animTop, {
            toValue: 0,
            friction: 10,
            useNativeDriver: true
        }).start();
    }

    const showBottomComponent = () => {
        Animated.spring(animBottom, {
            toValue: 0,
            friction: 10,
            useNativeDriver: true
        }).start();
    }

    const changeInput = (inputToModify: string) => {
        goToInputAddress(inputToModify);
    }

    const clearInputs = () => {
        routingInputs.origin.setter('');
        routingInputs.destination.setter('');
        routingCoordinates.origin.setter({ latitude: 0, longitude: 0 });
        routingCoordinates.destination.setter({ latitude: 0, longitude: 0 });
    }

    const changeState = (val: State) => {
        hideTopComponent();
        hideBottomComponent();
        mapState.setter(val);
    }

    const goBackToMap = () => {
        changeState(State.MAP)
        clearInputs();
    }

    const startNavigation = () => {
        changeState(State.NAVIGATION)
    }

    const getActualLocation = () => {
        googleServices.getReverseCoords(actualLocation.latitude.toString(), actualLocation.longitude.toString())
        .then((res) => {
            routingInputs.origin.setter(res.data.results[0].formatted_address);
            googleServices.getCoords(res.data.results[0].formatted_address)
            .then((res2) => {
                routingCoordinates.origin.setter({
                    latitude: res2.data.results[0].geometry.location.lat,
                    longitude: res2.data.results[0].geometry.location.lng
                })
            })
        })
    }

    const switchAddresses = () => {
        const tmpOriginInput = routingInputs.origin;
        const tmpOriginCoords = routingCoordinates.origin;

        routingInputs.origin.setter(routingInputs.destination.value);
        routingCoordinates.origin.setter({
            latitude: routingCoordinates.destination.latitude,
            longitude: routingCoordinates.destination.longitude
        });

        routingInputs.destination.setter(tmpOriginInput.value);
        routingCoordinates.destination.setter({
            latitude: tmpOriginCoords.latitude,
            longitude: tmpOriginCoords.longitude
        });

        if ((routingCoordinates.origin.latitude !== 0 && routingCoordinates.origin.longitude !== 0) &&
        (routingCoordinates.destination.latitude !== 0 && routingCoordinates.destination.longitude !== 0)) {
            googleServices.getDirections(routingCoordinates.origin, routingCoordinates.destination)
            .then((res) => {
                setDuration(res.data.routes[0].legs[0].duration.text);
                setDistance(res.data.routes[0].legs[0].distance.text);
                if (mapState.value === State.CONFIRMROUTE)
                    showBottomComponent();
            })
        }
    }

    return (
        <>
            <ConfirmRouteComponent
                animTop={animTop}
                animBottom={animBottom}
                inputs={{
                    origin: { value: routingInputs.origin.value, setter: routingInputs.origin.setter},
                    destination: { value: routingInputs.destination.value, setter: routingInputs.destination.setter }
                }}
                changeInput={changeInput}
                goBackToMap={goBackToMap}
                startNavigation={startNavigation}
                getActualLocation={getActualLocation}
                switchAddresses={switchAddresses}
                distance={distance}
                duration={duration}
            />
        </>
    )
}