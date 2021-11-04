import React, { memo, useState } from 'react';
import ResultQuery from 'kwivrr-ui/ResultQuery';
import useQuery from 'kwivrr-hooks/useQuery';
import Events from '../Events';
import EventsFallback from '../Events/EventsFallback';
import getCurrentDate from 'kwivrr-common/getCurrentDate';
import addToDate from 'kwivrr-common/addToDate';

function UpcomingEvents(props) {
    const { attendeeId } = props;
    const [page, setPage] = useState(1);
    const query = useQuery('getUpcomingAttendingEvents', {
        attendeeId,
        // startDate: getCurrentDate(),
        // endDate: addToDate(new Date(), 12, 'months').format('YYYY-MM-DD'),
        page,
    });
    return (
        <ResultQuery
            query={query}
            Success={Events}
            Loading={EventsFallback}
            upcoming={true}
            normalizeProps={(p) => {
                return {
                    events: p.entries,
                    listSummary: p.listSummary,
                    criteriaSummary: p.criteriaSummary,
                };
            }}
            page={page}
            setPage={setPage}
            {...props}
        />
    );
}

export default memo(UpcomingEvents);
