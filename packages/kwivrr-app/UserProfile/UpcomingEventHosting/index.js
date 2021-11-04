import React, { memo, useState } from 'react';
import ResultQuery from 'kwivrr-ui/ResultQuery';
import useQuery from 'kwivrr-hooks/useQuery';
import Events from '../Events';
import EventsFallback from '../Events/EventsFallback';
import getCurrentDate from 'kwivrr-common/getCurrentDate';
import addToDate from 'kwivrr-common/addToDate';

function UpcomingEventHosting(props) {
    const { hostId } = props;
    const [page, setPage] = useState(1);
    const query = useQuery('getUpcomingHostedEvents', {
        hostId,
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
            upcoming={true}
            hosting={true}
            page={page}
            setPage={setPage}
            {...props}
        />
    );
}

export default memo(UpcomingEventHosting);
