import React from 'react';
import SpeakersSection from './SpeakersSection';
import ResultQuery from 'kwivrr-ui/ResultQuery';
import useQuery from 'kwivrr-hooks/useQuery';

export default function ({ eventId, ...rest }) {
    const query = useQuery('getEventSpeakers', { id: eventId });
    return (
        <ResultQuery
            query={query}
            Success={SpeakersSection}
            normalizeProps={(p) => {
                return {
                    speakers: p.entries,
                };
            }}
            {...rest}
            eventId={eventId}
        />
    );
}
