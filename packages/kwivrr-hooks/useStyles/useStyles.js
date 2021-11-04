import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import useDimensions from 'kwivrr-hooks/useDimensions';
import useTheme from 'kwivrr-hooks/useTheme';
import usePlatform from '../usePlatftorm';

function useStyles(stylesheet, params) {
    const { screenWidth, screenHeight } = useDimensions();
    const theme = useTheme();
    const platform = usePlatform();
    const dwPercentage = (number) => number * 0.01 * screenWidth;
    const dhPercentage = (number) => number * 0.01 * screenHeight;
    if (!stylesheet) {
        return StyleSheet.create({});
    }
    const styles = stylesheet({
        ...theme,
        ...params,
        screenHeight,
        screenWidth,
        ...platform,
        dwPercentage,
        dhPercentage,
    });
    return StyleSheet.create(styles);
}

export default useStyles;
