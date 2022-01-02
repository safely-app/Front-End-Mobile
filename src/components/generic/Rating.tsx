import React from 'react';
import { View } from 'react-native';
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

interface Props {
    value?: number;
    count?: number;
    size?: number;
}

export const Rating = ({
    value,
    count,
    size
}: Props): JSX.Element => {
    const checkedValue = (value !== undefined) ? value : 3;
    const checkedCount = (count !== undefined) ? count : 5;
    const checkedSize = (size !== undefined) ? size : 15;

    return (
        <View style={{
            flex: 1,
            flexDirection: 'row',
            marginBottom: 5
        }}>
            {[...Array(checkedCount).keys()].map(index =>
                <FontAwesomeIcon
                    key={index}
                    size={checkedSize}
                    icon={faStar}
                    color={(index < checkedValue) ? 'yellow' : 'grey'}
                />
            )}
        </View>
    );
}