import React from 'react';
import { View } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import faker from 'faker';
import KwivrrImage from 'kwivrr-ui/KwivrrImage';
import TextHeader from 'kwivrr-ui/TextHeader';
import TextRegular from 'kwivrr-ui/TextRegular';

function AttendedEventCard() {
    const classes = useStyles(styles);
    const uri = faker.image.business();
    return (
        <View style={classes.attendedEventCard}>
            <KwivrrImage
                source={{ uri }}
                resizeMode="cover"
                style={classes.attendedEventCardImage}
            />
            <View style={classes.attendedEventInfo}>
                <TextHeader
                    style={classes.title}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    This is a textheader ui component
                </TextHeader>
                <TextRegular>07/08/2021, 4:32 PM</TextRegular>
            </View>
        </View>
    );
}

export default AttendedEventCard;
