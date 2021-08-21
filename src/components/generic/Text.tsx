import React from 'react';
import { Text as RNText } from 'react-native';
import { theme } from '../../styles';

interface Props extends React.ComponentProps<typeof RNText> {
    style: {[key: string]: string | number};
    type: keyof typeof theme.typeText;
    color: keyof typeof theme.colors;
    size: keyof typeof theme.sizeText;
}

export const Text = ({style, type, color, size, ...rest}: Props): JSX.Element => {
    return (
        <RNText
            style={{
                color: theme.colors[color],
                fontSize: theme.sizeText[size],
                ...theme.typeText[type],
                ...style
            }}
            {...rest}
        />
    )
}