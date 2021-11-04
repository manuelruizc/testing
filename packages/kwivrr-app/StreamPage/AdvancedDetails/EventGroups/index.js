import React from 'react';
import ResultQuery from 'kwivrr-ui/ResultQuery';
import useQuery from 'kwivrr-hooks/useQuery';
import EventGroups from './EventGroups';
import EventGroupsFallback from './EventGroupsFallback';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';

export default function (props) {
    const {
        userInfo: { user_id: userId },
    } = useAuthCredentials();
    const query = useQuery('getGroupEvents', { userId });
    return (
        <ResultQuery
            query={query}
            Success={EventGroups}
            Loading={EventGroupsFallback}
            normalizeProps={(p) => {
                return {
                    data: p.entries,
                };
            }}
            {...props}
        />
    );
}
