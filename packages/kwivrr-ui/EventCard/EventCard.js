import useStyles from 'kwivrr-hooks/useStyles';
import React from 'react';
import { View } from 'react-native';
import styles from './styles';

function EventCard({children}) {
    const classes = useStyles(styles);
    return (
        <View style={classes.container}>
            {children}
        </View>
    )
}

export default EventCard;
