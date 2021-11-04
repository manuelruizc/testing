import React from 'react';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import { View } from 'react-native';
import TextRegular from 'kwivrr-ui/TextRegular';

function SearchItemFallback() {
    return (
        <View>
            {new Array(4).fill(null).map((_, index) => (
                <Fallback key={index} />
            ))}
        </View>
    );
}

function Fallback() {
    const classes = useStyles(styles);
    return (
        <View style={classes.container}>
            <View style={classes.touchableContainer}>
                <View style={classes.itemImageContainerFallback} />
                <View style={classes.itemInfo}>
                    <View style={classes.nameFallback} />
                    <View style={classes.taglineFallback} />
                </View>
            </View>
        </View>
    );
}

export default SearchItemFallback;
