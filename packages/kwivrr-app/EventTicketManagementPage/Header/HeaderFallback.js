import useStyles from 'kwivrr-hooks/useStyles';
import React from 'react';
import { View } from 'react-native';
import styles from './styles';

function HeaderFallback() {
    const classes = useStyles(styles);
    return (
        <View style={classes.containerPlaceholder}>
            <View style={classes.backButtonContainer}>
                <View style={classes.backPlaceholder} />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                }}
            >
                <View style={classes.imagePlaceholder} />
                <View style={classes.infoContainer}>
                    <View style={classes.titlePlaceholder} />
                    <View style={classes.datePlaceholder} />
                    <View style={classes.hostPlaceholder} />
                </View>
            </View>
        </View>
    );
}

export default HeaderFallback;
