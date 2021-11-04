import React, { useMemo } from 'react';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from '../styles';
import EventsScrollView from '../../EventsScrollView';
import { defaultDateCalendarFormat } from 'kwivrr-common/dateFormats';

function CalendarEvents({ daySelected, events, ...rest }) {
    const classes = useStyles(styles);
    const daySelectedInfo = useMemo(() => {
        if (!events) return null;
        const dayInfo = events.filter((event) => {
            const eventDateFormatted = defaultDateCalendarFormat(
                event.startDate
            );
            return eventDateFormatted === daySelected;
        });
        if (!dayInfo.length) return null;
        return dayInfo;
    }, [events, daySelected]);

    return (
        <EventsScrollView
            {...rest}
            events={daySelectedInfo}
            fromCalendar={true}
        />
    );
}

export default CalendarEvents;
