import React from 'react';
import { SafeAreaView } from 'react-native';
import { theme } from '../../styles';

interface Props extends React.ComponentProps<typeof SafeAreaView> {
    style: {[key: string]: string | number};
    width: string;
    lineColor: keyof typeof theme.colors;
    borderWidth: number;
}

export const HLine: React.FC<Props> = ({style, width, lineColor, borderWidth, ...rest}) => {
    return (
        <SafeAreaView
            style={{
                borderBottomColor: theme.colors[lineColor],
                width: width,
                borderBottomWidth: borderWidth,
                ...style
            }}
            {...rest}
        />

    )
}