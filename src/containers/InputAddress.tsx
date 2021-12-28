import React, {useEffect, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import { RootState } from '../redux';
import { InputAddressComponent } from '../components';
import { useNavigation } from '@react-navigation/native';
import { googleServices } from '../services';
import { TextInput } from 'react-native';

export const InputAddress = (): JSX.Element => {

    const route: RouteProp<{ params: { latitude: number, longitude: number } }, 'params'> = useRoute();
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

    const fetchPlacesSearch = (query: string) => {
        if (route.params.latitude != 0 && route.params.longitude != 0) {
            const latitude: number = route.params.latitude;
            const longitude: number = route.params.longitude;
            // console.log(query)
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
            />
        </>
     );
};
