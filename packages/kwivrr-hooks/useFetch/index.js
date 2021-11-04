import React, { useEffect, useMemo, useState } from 'react';

function useFetch(fetchCall) {
    const [data, setData] = useState(null);
    function initialFetch() {
        fetchCall()
            .then((response) => {
                setData(response);
            })
            .catch((e) => console.log('e'));
    }
    function fetchData() {
        setData(null);
        fetchCall()
            .then((response) => {
                setData(response);
            })
            .catch((e) => console.log('e'));
    }

    useEffect(() => {
        initialFetch();
    }, []);

    const memoizedData = useMemo(() => data, [data]);
    return {
        data: memoizedData,
        setData,
        fetchData,
    };
}

export default useFetch;
