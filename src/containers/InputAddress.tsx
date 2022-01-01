import React, {useEffect, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import { RootState } from '../redux';
import { InputAddressComponent } from '../components';
import { useNavigation } from '@react-navigation/native';
import { googleServices } from '../services';
import { TextInput } from 'react-native';
import { State } from '../../types/general';
import { LatLng } from 'react-native-maps';

interface Props {
}

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export const InputAddress = (): JSX.Element => {

    const route: RouteProp<{ 
        params: { 
            latitude: number,
            longitude: number,
            mapState: {setter: (val: State) => void},
            routingInputs: {
                origin: { value: string, setter: (input: string) => void },
                destination: { value: string, setter: (input: string) => void }
            },
            routingCoordinates: {
                origin: { latitude: number, longitude: number, setter: (obj: LatLng) => void },
                destination: { latitude: number, longitude: number, setter: (obj: LatLng) => void }
            };
            inputToModify: string
        } 
    }, 'params'> = useRoute();
    const {credentials} = useSelector((state: RootState) => state.user);
    const navigation = useNavigation();
    const [input, setInput] = useState<string>('');
    const [places, setPlaces] = useState<[]>([]);
    const [inputRef, setInputRef] = useState<TextInput | null>(null);

    useEffect(() => {
        if (inputRef)
            inputRef.focus()
    }, [inputRef])

    const goBack = () => {
        navigation.goBack();
    }

    const chooseAddress = (address: string) => {
        if (route.params && route.params.mapState) {
            if (route.params.inputToModify) {
                const inputToModify = route.params.inputToModify;

                if (inputToModify === 'origin') {
                    route.params.routingInputs.origin.setter(address)
                    googleServices.getCoords(address)
                    .then((res) => {
                        route.params.routingCoordinates.origin.setter({
                            latitude: res.data.results[0].geometry.location.lat,
                            longitude: res.data.results[0].geometry.location.lng
                        })
                    })
                } else {
                    route.params.routingInputs.destination.setter(address)
                    googleServices.getCoords(address)
                    .then((res) => {
                        route.params.routingCoordinates.destination.setter({
                            latitude: res.data.results[0].geometry.location.lat,
                            longitude: res.data.results[0].geometry.location.lng
                        })
                    })
                }
            }
            const mapState = route.params.mapState;
            mapState.setter(State.CONFIRMROUTE);
            goBack();
        }
    }

    const fetchPlacesSearch = (query: string) => {
        if (route.params.latitude != 0 && route.params.longitude != 0) {
            const latitude: number = route.params.latitude;
            const longitude: number = route.params.longitude;
            googleServices.getPlacesSearch(query, latitude, longitude)
            .then((res) => {
                setPlaces(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    return (
        <>
            <InputAddressComponent
                goBack={goBack}
                input={input}
                setInput={setInput}
                fetchPlacesSearch={fetchPlacesSearch}
                places={places}
                setInputRef={setInputRef}
                chooseAddress={chooseAddress}
            />
        </>
     );
};
