import React from 'react';
import { View } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import HeaderFallback from '../Header/HeaderFallback';
import styles from './styles';

function AttendeeFallback() {
    const classes = useStyles(styles);
    return (
        <View style={classes.containerPlaceholder}>
            <HeaderFallback />
            <View style={classes.innerContainerPlaceholder}>
                <View style={classes.searchbarPlaceholder} />
                {new Array(3).fill(null).map((_, index) => (
                    <View key={index} style={classes.ticketPlaceholder} />
                ))}
            </View>
        </View>
    );
}

export default AttendeeFallback;
