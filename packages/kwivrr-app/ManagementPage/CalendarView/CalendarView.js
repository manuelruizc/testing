import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import PropTypes from 'prop-types';
import { Calendar } from 'react-native-calendars';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import { cardPressableOptions, getMarkedDates } from '../utils';
import CalendarEvents from './CalendarEvents';
import moment from 'moment';
import kwivrrApi from 'kwivrr-common/sdk';

let today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
});
today = today.substr(6) + '/' + today.substr(0, 5);
today = today.split('/').join('-');

function CalendarView({ data, events: apiDates, startDate, endDate }) {
    const classes = useStyles(styles);
    const [events, setEvents] = useState(apiDates);
    const arrayEvents = useMemo(() => {
        return Object.keys(events).map((key, index) => {
            return {
                date: key,
            };
        });
    }, [events]);

    const [daySelected, setDaySelected] = useState(today);
    const [isCalendarLoading, setIsCalendarLoading] = useState(false);
    const markedDates = useMemo(
        () => (isCalendarLoading ? [] : getMarkedDates(arrayEvents)),
        [arrayEvents, isCalendarLoading]
    );

    const isToday = useMemo(() => {
        if (!events) return null;
        daySelected === today.split('/').join('-');
    }, [daySelected, today, events]);

    const [dates, setDates] = useState({
        startDate,
        endDate,
    });

    const changeDates = async () => {
        try {
            setIsCalendarLoading(true);
            const { startDate, endDate } = dates;
            const response = await kwivrrApi.getEventCalendar({
                startDate,
                endDate,
            });
            setEvents(response);
            setIsCalendarLoading(false);
        } catch (e) {
            setIsCalendarLoading(false);
            console.log('error', e);
        }
    };

    useEffect(() => {
        changeDates();
    }, [dates]);

    return (
        <View style={classes.container}>
            <ScrollView
                style={classes.scrollView}
                contentContainerStyle={classes.scrollViewContentContainer}
            >
                <View>
                    <Calendar
                        theme={{
                            todayTextColor: 'red',
                            selectedDayBackgroundColor: '#F7B5B1',
                            selectedDayTextColor: 'black',
                        }}
                        style={classes.calendar}
                        markedDates={{
                            ...markedDates,
                            [daySelected]: {
                                selected: true,
                                disableTouchEvent: true,
                                selectedColor: '#EC443D',
                                selectedTextColor: 'white',
                            },
                        }}
                        onMonthChange={(date) => {
                            const { month, year, dateString } = date;
                            setDates({
                                startDate: moment(dateString)
                                    .startOf('month')
                                    .format('YYYY-MM-DD'),
                                endDate: moment(dateString)
                                    .endOf('month')
                                    .format('YYYY-MM-DD'),
                            });
                        }}
                        onDayPress={(day) => {
                            const { dateString } = day;
                            setDaySelected(dateString);
                        }}
                        renderArrow={(direction) => {
                            if (direction === 'right')
                                return <KwivrrIcon name="arrow-right" />;
                            return <KwivrrIcon name="arrow-left" />;
                        }}
                    />
                    {isCalendarLoading && (
                        <View
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '100%',
                                height: '90%',
                                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <ActivityIndicator size="small" color="tomato" />
                        </View>
                    )}
                </View>
                <CalendarEvents
                    startDate={daySelected}
                    scope="hosting"
                    cardPressableOptions={cardPressableOptions}
                    cardsPressable
                    isHost
                    message={
                        isToday
                            ? 'No streams planned for today'
                            : 'No streams planned for this day'
                    }
                    title="My Upcoming Streams"
                    style={classes.scrollViewWithMargin}
                />
                <CalendarEvents
                    startDate={daySelected}
                    scope="completed"
                    cardPressableOptions={cardPressableOptions}
                    cardsPressable
                    isHost
                    message={
                        isToday
                            ? 'No streams planned for today'
                            : 'No streams planned for this day'
                    }
                    title="My Completed Streams"
                    style={classes.scrollViewWithMargin}
                />
                <CalendarEvents
                    startDate={daySelected}
                    scope="registeredFor"
                    cardPressableOptions={cardPressableOptions}
                    cardsPressable
                    // events={myUpcomingStreams}
                    message={
                        isToday
                            ? 'No streams planned for today'
                            : 'No streams planned for this day'
                    }
                    title="Registered Events"
                    style={classes.scrollViewWithMargin}
                />
                <CalendarEvents
                    startDate={daySelected}
                    scope="attended"
                    cardPressableOptions={cardPressableOptions}
                    cardsPressable
                    // events={myUpcomingStreams}
                    message={
                        isToday
                            ? 'No streams planned for today'
                            : 'No streams planned for this day'
                    }
                    title="Attended Events"
                    style={classes.scrollViewWithMargin}
                />
            </ScrollView>
        </View>
    );
}

CalendarView.propTypes = {
    data: PropTypes.array,
};

export default CalendarView;
