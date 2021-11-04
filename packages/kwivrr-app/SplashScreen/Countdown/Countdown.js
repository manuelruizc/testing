import React from 'react';
import { View } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import TextHeader from 'kwivrr-ui/TextHeader';
import TextRegular from 'kwivrr-ui/TextRegular';

function Countdown({ days, hours, minutes, seconds }) {
    const classes = useStyles(styles);
    return (
        <View style={classes.container}>
            <TextHeader size={20} style={classes.title}>
                Starts In:
            </TextHeader>
            <View style={classes.quantities}>
                <View style={classes.numberContainer}>
                    <View style={classes.number}>
                        <TextHeader size={22}>{days}</TextHeader>
                    </View>
                    <TextRegular style={classes.label}>Days</TextRegular>
                </View>
                <View style={classes.numberContainer}>
                    <View style={classes.number}>
                        <TextHeader size={22}>{hours}</TextHeader>
                    </View>
                    <TextRegular style={classes.label}>Hours</TextRegular>
                </View>
                <View style={classes.numberContainer}>
                    <View style={classes.number}>
                        <TextHeader size={22}>{minutes}</TextHeader>
                    </View>
                    <TextRegular style={classes.label}>Minutes</TextRegular>
                </View>
                <View style={classes.numberContainer}>
                    <View style={classes.number}>
                        <TextHeader size={22}>{seconds}</TextHeader>
                    </View>
                    <TextRegular style={classes.label}>Seconds</TextRegular>
                </View>
            </View>
        </View>
    );
}

export default Countdown;
