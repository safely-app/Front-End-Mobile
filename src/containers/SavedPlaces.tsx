import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux/reducers';
import {SavedPlacesComponent} from '../components/index';
import { useNavigation } from '@react-navigation/native';
import { safeplaceServices, googleServices } from '../services';

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

const initialStatePlace: RecurringPlace = {
    __v: 0,
    _id: "",
    address: "",
    city: "",
    coordinate: [],
    createdAt: "",
    name: "",
    updatedAt: ""
}

export const SavedPlaces = (): JSX.Element => {

    const dispatch = useDispatch();
    const {credentials} = useSelector((state: RootState) => state.user);
    const navigation = useNavigation();
    const [recurringPlaces, setRecurringPlaces] = useState<[]>([]);
    const [modalRecurring, setModalReccuring] = useState<boolean>(false);
    const [safeplaceEditing, setSafeplaceEdit] = useState<RecurringPlace>(initialStatePlace);
    const [addressPlaces, setAddressPlaces] = useState<[]>([]);
    const [addressInput, setAddressInput] = useState<string>("");
    const [addressInputFocus, setAddressInputFocus] = useState<boolean>(false);
    const [nameInput, setNameInput] = useState<string>("");
    const [cityInput, setCityInput] = useState<string>("");
    const [coordinate, setCoordinate] = useState<[]>([]);

    useEffect(() => {
        safeplaceServices.getRecurringPlaces(credentials.token)
        .then((res) => {
            setRecurringPlaces(res.data);
        })
        .catch((err) => {
            console.log(err);
            throw err;
        })

        return (() => {
            setModalReccuring(false);
            setRecurringPlaces([]);
            setAddressInput("");
            setSafeplaceEdit(initialStatePlace);
        })
    }, [])

    const refreshRecurringPlaces = () => {
        safeplaceServices.getRecurringPlaces(credentials.token)
        .then((res) => {
            setRecurringPlaces(res.data);
        })
        .catch((err) => {
            console.log(err);
            throw err;
        })
    }

    const getOriginPlaces = (text: string, latitude: number, longitude: number) => {
        googleServices.getPlaces(text, latitude, longitude)
        .then((res) => {
            setAddressPlaces(res.data.predictions);
        })
        .catch((err) => {
          console.log(err);
          throw err;
        })
    }

    const newPlace = (name: string, address: string, city: string, coordinate: Array<string>) => {
        safeplaceServices.createRecurringPlace(credentials.id, name, address, city, coordinate, credentials.token)
        .then((res) => {
            setModalReccuring(false);
            setSafeplaceEdit({});
            setAddressInput("");
            setAddressPlaces([]);
            setCityInput("");
            setNameInput("");
            setCoordinate([]);
            setAddressInputFocus(false);
            refreshRecurringPlaces();
        })
        .catch((err) => {
            console.log(err);
            throw err;
        })
    }

    const editPlace = (idPlace: string, name: string, address: string, city: string, coordinate: Array<string>) => {
        safeplaceServices.editRecurringPlace(idPlace, name, address, city, coordinate, credentials.token)
        .then((res) => {
            setSafeplaceEdit(initialStatePlace);
            setModalReccuring(false);
            setAddressPlaces([]);
            setAddressInput("");
            setCityInput("");
            setNameInput("");
            setCoordinate([]);
            setAddressInputFocus(false);
            refreshRecurringPlaces();
            // resetState();
        })
        .catch((err) => {
            console.log(err);
            throw err;
        })
    }

    const deletePlace = (idPlace: string) => {
        safeplaceServices.deleteRecurringPlace(idPlace, credentials.token)
        .then(() => {
            setSafeplaceEdit(initialStatePlace);
            setModalReccuring(false);
            setAddressPlaces([]);
            setAddressInput("");
            setCityInput("");
            setNameInput("");
            setCoordinate([]);
            setAddressInputFocus(false);
            refreshRecurringPlaces();
        })
        .catch((err) => {
            throw err;
        })
    }

    const setCoordsFromPlace = (address: string)  => {
        googleServices.getCoords(address)
        .then((res) => {
            setCoordinate([res.data.results[0].geometry.location.lat.toString(), res.data.results[0].geometry.location.lng.toString()]);
        })
        .catch((err) => {
          console.log(err);
        })
    }

    const goToMap = (coordinate: Array<string>, address: string) => {
        navigation.navigate('Home', {latitude: coordinate[0], longitude: coordinate[1], address: address});
    }

    return (
        <>
            <SavedPlacesComponent
                recurringPlaces={recurringPlaces}
                modalRecurring={modalRecurring}
                setModalRecurring={setModalReccuring}
                safeplaceEditing={safeplaceEditing}
                setSafeplaceEdit={setSafeplaceEdit}
                addressInput={addressInput}
                setAddressInput={setAddressInput}
                addressPlaces={addressPlaces}
                getOriginPlaces={getOriginPlaces}
                addressInputFocus={addressInputFocus}
                setAddressInputFocus={setAddressInputFocus}
                nameInput={nameInput}
                setNameInput={setNameInput}
                cityInput={cityInput}
                setCityInput={setCityInput}
                editPlace={editPlace}
                newPlace={newPlace}
                refreshRecurringPlace={refreshRecurringPlaces}
                coordinate={coordinate}
                setCoordinate={setCoordinate}
                setCoordsFromPlace={setCoordsFromPlace}
                deletePlace={deletePlace}
                goToMap={goToMap}
            />
        </>
    );
};
