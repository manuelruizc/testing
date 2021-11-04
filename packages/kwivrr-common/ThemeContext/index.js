import React, { useMemo, useState } from 'react';
import {
    Dimensions,
    Platform,
    StatusBar,
    useWindowDimensions,
} from 'react-native';

const { width: dW, height: dH } = Dimensions.get('window');

export const ThemeContext = React.createContext();

export function ThemeProvider({ children }) {
    const dims = useWindowDimensions();
    const appTheme = useMemo(
        () => ({
            device: {
                size: {
                    width: dW,
                    height: dH,
                },
            },
            palette: {
                type: 'light',
                pillsColors: {
                    blue: '#67BFDC',
                    gray: '#C9C9C9',
                    green: '#4ACC79',
                    waitlist: '#F2BE48',
                },
                common: {
                    white: '#FFFFFF',
                    black: '#000000',
                },
                text: {
                    primary: 'rgba(0, 0, 0, 0.9)',
                    secondary: 'rgba(0, 0, 0, 0.54)',
                    disabled: 'rgba(0, 0, 0, 0.38)',
                    hint: 'rgba(0, 0, 0, 0.12)',
                },
                button: {
                    primary: '#3551A1',
                    secondary: '#3551A1',
                    disabled: '#3551A1',
                    hint: '#3551A1',
                },
                loading: {
                    indicator: '#DC4446',
                },
                input: {
                    color: 'black',
                    backgroundColor: 'rgba(235, 235, 235, 0.5)',
                },
                divider: 'rgba(0, 0, 0, 0.02)',
                placeholder: 'rgba(66, 66, 66, 0.15)',
            },
            shadows: (index) => {
                const _shadows = [
                    {
                        elevation: 5,
                        shadowOffset: {
                            width: 0,
                            height: 0,
                        },
                        shadowOpacity: 0.4,
                        shadowRadius: 8,
                        shadowColor: 'black',
                    },
                ];
                return _shadows[index - 1];
            },
        }),
        [dims]
    );
    return (
        <ThemeContext.Provider value={{ theme: appTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
