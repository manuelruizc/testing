import useStyles from 'kwivrr-hooks/useStyles';
import React from 'react';
import { View } from 'react-native';
import TextHeader from 'kwivrr-ui/TextHeader';
import styles from '../styles';

function ListItemFallback({ title }) {
    const classes = useStyles(styles);
    return (
        <View style={classes.hello}>
            <TextHeader size={18}>{title}</TextHeader>
            <View style={classes.headerPlaceholder} />
            {new Array(3).fill(null).map((_, index) => (
                <View key={index} style={classes.itemContainerPlaceholder}>
                    <View style={classes.imageFallback} />
                    <View style={classes.dataPlaceholder} />
                </View>
            ))}
        </View>
    );
}

export default ListItemFallback;
