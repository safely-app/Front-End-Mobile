import React, {useEffect, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import { RootState } from '../redux';
import { InputAddressComponent } from '../components';

interface params {
    input: string
}

export const InputAddress = (): JSX.Element => {

    const route: RouteProp<{ params: { id: string } }, 'params'> = useRoute();
    const {credentials} = useSelector((state: RootState) => state.user);


    return (
        <>
            <InputAddressComponent
            
            />
        </>
     );
};
