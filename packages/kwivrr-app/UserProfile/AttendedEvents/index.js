import React, { useState } from 'react';
import ResultQuery from 'kwivrr-ui/ResultQuery';
import useQuery from 'kwivrr-hooks/useQuery';
import Events from '../Events';
import EventsFallback from '../Events/EventsFallback';
import getCurrentDate from 'kwivrr-common/getCurrentDate';
import substractToDate from 'kwivrr-common/substractToDate';

export default function (props) {
    const { attendeeId } = props;
    const [page, setPage] = useState(1);
    const query = useQuery('getAttendedEvents', {
        attendeeId,
        startDate: substractToDate(new Date(), 12, 'months').format(
            'YYYY-MM-DD'
        ),
        endDate: getCurrentDate(),
        page,
    });
    return (
        <ResultQuery
            query={query}
            Success={Events}
            Loading={EventsFallback}
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
