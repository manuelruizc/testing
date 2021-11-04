import React from 'react';
import { ScrollView, View } from 'react-native';
import PropTypes from 'prop-types';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import CardSection from './CardSection';

const cardPressableOptions = {
    allCardIsPressable: false,
    imagePressable: true,
    streamTitlePressable: true,
};

function CardView({ data }) {
    const classes = useStyles(styles);

    // const myUpcomingStreams = useMemo(() => getUpcomingStreams(data), [data]);
    // const myCompletedStreams = useMemo(() => getCompletedStreams(data), [data]);
    // const registeredEvents = useMemo(() => getRegisteredEvents(data), [data]);
    // const attendedEvents = useMemo(() => getAttendedEvents(data), [data]);

    // console.log('attendedEvents', attendedEvents);

    // if (!data) {
    //     return <LoadingUI />;
    // }

    return (
        <View style={classes.container}>
            <ScrollView
                style={classes.scrollView}
                contentContainerStyle={classes.scrollViewContentContainer}
            >
                <CardSection
                    cardPressableOptions={cardPressableOptions}
                    cardsPressable
                    scope="hosting"
                    isHost
                    message={'No streams planned for this day'}
                    title="My Upcoming Streams"
                    style={classes.scrollViewWithMargin}
                />
                <CardSection
                    cardPressableOptions={cardPressableOptions}
                    cardsPressable
                    scope="registeredFor"
                    message={'No streams planned for this day'}
                    title="Registered"
                    style={classes.scrollViewWithMargin}
                />
                <CardSection
                    cardPressableOptions={cardPressableOptions}
                    cardsPressable
                    scope="completed"
                    isHost
                    message={'No streams planned for this day'}
                    title="My Completed Streams"
                    style={classes.scrollViewWithMargin}
                />
                <CardSection
                    cardPressableOptions={cardPressableOptions}
                    cardsPressable
                    scope="attended"
                    message={'No streams planned for this day'}
                    title="Attended"
                    style={classes.scrollViewWithMargin}
                />
            </ScrollView>
        </View>
    );
}

CardView.propTypes = {
    data: PropTypes.array,
};

export default CardView;
