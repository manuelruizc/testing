import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import TextRegular from 'kwivrr-ui/TextRegular';

const EventCardFallback = () => {
    const classes = useStyles(styles);

    return (
        <View style={classes.cardFallback}>
            <View style={classes.cardImage} />
            <View style={classes.cardFooter}>
                <View style={classes.topInfo}>
                    <View style={classes.eventNameButton}>
                        <TextRegular style={classes.eventName}></TextRegular>
                    </View>
                </View>
                <TextRegular></TextRegular>
            </View>
        </View>
    );
};

export default EventCardFallback;
