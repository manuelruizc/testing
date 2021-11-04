import React from 'react';
import { Platform } from 'react-native';

const isAndroid = Platform.OS === 'android';
const isiOS = Platform.OS === 'ios';

function usePlatform() {
    return { isAndroid, isiOS, OS: Platform.OS, version: Platform.Version };
}

export default usePlatform;
