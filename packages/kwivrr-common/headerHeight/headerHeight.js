import React from 'react';
import { Platform } from 'react-native';

const headerHeight = Platform.OS === 'android' ? 70 : 120;

export default headerHeight;
