import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import useStyles from 'kwivrr-hooks/useStyles';

export default function () {
    const classes = useStyles(styles);
    return (
        <View style={classes.cardContainer}>
            <View style={classes.image} />
            <View style={classes.bottomInfo}>
                <View style={classes.topInfo}>
                    <View style={classes.topInfoPlaceholder} />
                </View>
                <View style={classes.dateTimePlaceholder} />
            </View>
        </View>
    );
}
