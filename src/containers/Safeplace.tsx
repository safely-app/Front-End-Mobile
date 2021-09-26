import React, {useEffect, useState} from 'react';
import {SafeplaceComponent} from '../components/index';
import {useNavigation, useRoute} from '@react-navigation/native';
import {safeplaceServices} from '../services';

export const Safeplace = (): JSX.Element => {

    const navigation = useNavigation();
    const route = useRoute();
    const [safeplace, setSafeplace] = useState<{}>({});
    const [showHours, setShowHours] = useState<boolean>(false);
    const days: Array<string> = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    const [modalComment, setModalComment] = useState<boolean>(false);

    useEffect(() => {
        safeplaceServices.getSafeplaceId(route.params.id)
        .then((res) => {
            setSafeplace(res.data);
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
    }, [])

    return (
        <>
            <SafeplaceComponent
                safeplace={safeplace}
                showHours={showHours}
                setShowHours={setShowHours}
                days={days}
                modalComment={modalComment}
            />
        </>
     );
};
