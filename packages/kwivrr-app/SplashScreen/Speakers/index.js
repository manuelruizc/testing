import React from 'react';
import Speakers from './Speakers';
import ResultQuery from 'kwivrr-ui/ResultQuery';
import useQuery from 'kwivrr-hooks/useQuery';

export default function ({ eventId }) {
    const query = useQuery('getEventSpeakers', { id: eventId });
    return (
        <ResultQuery
            query={query}
            Success={Speakers}
            normalizeProps={(p) => {
                return {
                    speakers: p.entries,
                };
            }}
        />
    );
}
