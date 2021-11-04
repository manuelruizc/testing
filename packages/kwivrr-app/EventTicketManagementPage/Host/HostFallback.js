import useStyles from 'kwivrr-hooks/useStyles';
import React from 'react';
import { View } from 'react-native';
import HeaderFallback from '../Header/HeaderFallback';
import styles from './styles';

function HostFallback() {
    const classes = useStyles(styles);
    return (
        <React.Fragment>
            <HeaderFallback />
            <View style={classes.containerPlaceholder}>
                <View style={classes.placeholder} />
                <View style={classes.placeholder} />
            </View>
        </React.Fragment>
    );
}

export default HostFallback;
