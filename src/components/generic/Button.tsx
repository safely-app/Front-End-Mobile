import React from 'react';
import { TouchableOpacity } from 'react-native';
import { theme } from '../../styles';

interface Props extends React.ComponentProps<typeof TouchableOpacity> {
    style: {[key: string]: string | number};
    width: string;
    type: keyof typeof theme.typeButton;
    // textColor: keyof typeof theme.colors;
    bgColor: keyof typeof theme.colors;
}

export const Button = ({style, width, type, bgColor, ...rest}: Props): JSX.Element => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: theme.colors[bgColor],
                width: width,
                ...theme.typeButton[type],
                ...style
            }}
            {...rest}
        />

    )
}