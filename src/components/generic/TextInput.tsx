import React from 'react';
import { TextInput as RNTextInput } from 'react-native';
import { theme } from '../../styles';

interface Props extends React.ComponentProps<typeof RNTextInput> {
    style: {[key: string]: string | number};
    width: string;
    type: keyof typeof theme.typeTextInput;
    bgColor: keyof typeof theme.colors;
}

export const TextInput = ({style, width, type, bgColor, ...rest}: Props): JSX.Element => {
    return (
        <RNTextInput
            style={{
                width: width,
                backgroundColor: theme.colors[bgColor],
                ...theme.typeTextInput[type],
                ...style
            }}
            {...rest}
        />

    )
}