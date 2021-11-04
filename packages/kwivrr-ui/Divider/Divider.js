import React from 'react';
import { View } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';

function Divider({ style = {} }) {
    const classes = useStyles(styles);
    return <View style={{ ...classes.container, height: 1, ...style }} />;
}

export default Divider;
