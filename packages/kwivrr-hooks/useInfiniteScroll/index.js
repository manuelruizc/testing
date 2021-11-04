import React, { useState } from 'react';

function useInfiniteScroll({
    initialFetchingOver = false,
    fetchCall = async () => {},
    initialData = [],
    scope,
}) {
    const [isLoading, setIsLoading] = useState(false);
    // const [initialFetchingOverState, setInitialFetchingOverState] =
    //     useState(initialFetchingOver);
    const [fetchingOver, setFetchingOver] = useState(initialFetchingOver);
    const [page, setPage] = useState(1);
    const [data, setData] = useState(initialData);

    const onEndReached = async () => {
        try {
            if (fetchingOver || isLoading) return;
            setIsLoading(true);
            const { entries, hasMore } = await fetchCall();
            if (!hasMore) {
                setFetchingOver(true);
            }
            setPage((prev) => prev + 1);
            setData((prevData) => {
                return [...prevData, ...entries];
            });
            setIsLoading(false);
        } catch (e) {
            console.error(e);
            setFetchingOver(true);
            setIsLoading(false);
        }
    };

    const refresh = () => {
        setIsLoading(false);
        setFetchingOver(initialFetchingOver);
        setPage(1);
    };

    const dataRefetch = async () => {
        try {
            refresh();
            setIsLoading(true);
            const { entries, hasMore } = await fetchCall(1);
            if (!hasMore) {
                setFetchingOver(true);
            } else {
                setFetchingOver(false);
            }
            setPage((prev) => prev + 1);
            setData((prevData) => {
                return [...entries];
            });
            setIsLoading(false);
        } catch (e) {
            console.error(e);
            setFetchingOver(true);
            setIsLoading(false);
        }
    };

    const dataRefetchToPage = async (toPage = null) => {
        try {
            if (toPage === null) {
                toPage = page;
            }
            let currentPage = 1;
            refresh();
            setIsLoading(true);
            let newEntries = [];
            while (currentPage <= toPage) {
                const { entries, hasMore } = await fetchCall(currentPage);
                if (!hasMore) {
                    setFetchingOver(true);
                } else {
                    setFetchingOver(false);
                }
                newEntries = [...newEntries, ...entries];
                currentPage++;
            }
            // setPage(currentPage + 1);
            setData(() => {
                return [...newEntries];
            });
            setIsLoading(false);
        } catch (e) {
            console.error(e);
            setFetchingOver(true);
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        fetchingOver,
        page,
        onEndReached,
        fetchMore: onEndReached,
        data,
        setData,
        refresh,
        dataRefetch,
        dataRefetchToPage,
    };
}

export default useInfiniteScroll;
