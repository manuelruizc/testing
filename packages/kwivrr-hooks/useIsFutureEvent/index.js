import React, { useMemo } from 'react';
import moment from 'moment';

function useIsFutureEvent(eventStartDatetime) {
    const isFutureEvent = useMemo(() => {
        const date = moment(eventStartDatetime);
        const currentDate = moment(new Date());
        const dDiff = date.diff(currentDate);
        if (dDiff > 0) {
            return true;
        } else {
            return false;
        }
    }, [eventStartDatetime]);
    return isFutureEvent;
}

export default useIsFutureEvent;
