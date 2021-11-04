import useDimensions from 'kwivrr-hooks/useDimensions';
import useStyles from 'kwivrr-hooks/useStyles';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function () {
    const { screenWidth } = useDimensions();
    return (
        <View
            style={{
                flex: 1,
                width: screenWidth,
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <ActivityIndicator size="small" color="red" />
        </View>
    );
}
