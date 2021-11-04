import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import AttendedEventCard from './AttendedEventCard';
import TextRegular from 'kwivrr-ui/TextRegular';
import TextHeader from 'kwivrr-ui/TextHeader';
import { useNavigation } from '@react-navigation/native';
import { MANAGEMENT, STACKS } from 'kwivrr-common/data/types/navigation';

function AttendedEventsSection() {
    const classes = useStyles(styles);
    const { navigate } = useNavigation();
    const onPress = () => {
        navigate(STACKS.MANAGEMENT, {
            screen: MANAGEMENT.EVENTMANAGEMENT,
        });
    };
    return (
        <View style={classes.attendedEvents}>
            <View style={{ ...classes.header, paddingHorizontal: 10 }}>
                <TextHeader style={classes.title}>
                    Events You Attended
                </TextHeader>
                <TouchableOpacity onPress={onPress}>
                    <TextRegular
                        size={12}
                        color={'rgb(211, 105, 99)'}
                        style={classes.title}
                    >
                        See all attended events
                    </TextRegular>
                </TouchableOpacity>
            </View>
            <View style={classes.attendedEvents}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ flex: 1 }}
                >
                    {[0, 0, 0, 0, 0, 0, 0].map((_, idx) => (
                        <AttendedEventCard key={idx} />
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}

export default AttendedEventsSection;
