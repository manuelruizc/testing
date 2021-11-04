import React, { memo } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import EventCard from '../EventCard';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import TextRegular from 'kwivrr-ui/TextRegular';
import useTheme from 'kwivrr-hooks/useTheme';

function Events({
    events,
    upcoming = false,
    hosting = false,
    label = 'label',
    ctaText = 'ctaText',
    ctaOnPress = () => {},
}) {
    const classes = useStyles(styles);
    const { palette } = useTheme();

    return (
        <View style={classes.container}>
            {events.length > 0 ? (
                <View style={{ width: '100%' }}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={classes.scrollStyle}
                        contentContainerStyle={classes.scrollContent}
                    >
                        {events.map((event, idx) => {
                            return (
                                <EventCard
                                    key={idx}
                                    upcoming={upcoming}
                                    hosting={hosting}
                                    event={event}
                                />
                            );
                        })}
                    </ScrollView>
                </View>
            ) : (
                <View style={classes.noEventsContainer}>
                    <TextRegular size={18} style={classes.label}>
                        {label}
                    </TextRegular>
                    <TouchableOpacity onPress={ctaOnPress}>
                        <TextRegular size={18} color={palette.button.primary}>
                            {ctaText}
                        </TextRegular>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}
export default memo(Events);
