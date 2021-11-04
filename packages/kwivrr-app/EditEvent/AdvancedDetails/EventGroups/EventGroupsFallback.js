import React from 'react';
import { View } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import TextRegular from 'kwivrr-ui/TextRegular';

function EventGroupsFallback() {
    const classes = useStyles(styles);
    return (
        <View style={classes.container}>
            <TextRegular>Stream Group</TextRegular>
            <View style={classes.containerData}>
                <View style={classes.existingGroupsContainer} />
                <View style={classes.textFallback} />
            </View>
        </View>
    );
}

export default EventGroupsFallback;
