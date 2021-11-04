import React from 'react';
import { View } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import EventCardFallback from '../EventCard/EventCardFallback';

function EventsFallback() {
    const classes = useStyles(styles);
    return (
        <View style={classes.container}>
            <View style={classes.scrollContentFallback}>
                {new Array(3).fill(null).map((_, idx) => {
                    return <EventCardFallback key={idx} />;
                })}
            </View>
        </View>
    );
}
export default EventsFallback;
