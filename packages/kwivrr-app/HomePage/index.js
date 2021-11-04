import React, { useEffect, useState } from 'react';
import ResultQuery from 'kwivrr-ui/ResultQuery';
import useQuery from 'kwivrr-hooks/useQuery';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';
import HomePage from './HomePage';
import useAppActions from 'kwivrr-hooks/useAppActions';

const HomePageIndex = () => {
    const { addingNewHomeEvent, clearAddedNewEvent } = useAppActions();
    const { userIsLogged } = useAuthCredentials();
    const [page, setPage] = useState(1);
    const query = useQuery('getFeeds', { page: 1 });
    const { refetch } = query;

    useEffect(() => {
        setPage(1);
        refetch();
    }, [userIsLogged]);

    useEffect(() => {
        if (addingNewHomeEvent) {
            setPage(1);
            refetch();
            clearAddedNewEvent();
        }
    }, [addingNewHomeEvent, clearAddedNewEvent, refetch, setPage]);

    return (
        <ResultQuery
            query={query}
            Success={HomePage}
            normalizeProps={(p) => {
                // alert(JSON.stringify(p.entries));
                return {
                    ...p,
                    response: p.entries,
                };
            }}
            refetch={refetch}
            page={page}
            setPage={setPage}
        />
    );
};

export default HomePageIndex;
