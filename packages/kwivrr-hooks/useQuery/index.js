import delayResolve from 'kwivrr-common/delayResolve';
import React from 'react';
import { useQuery as useQueryReactQuery } from 'react-query';
import getQuery from '../getQuery';

const useQuery = (query, params = null, queryKey = '') => {
    const queryFn = getQuery(query);
    const finalQuery = query + queryKey;
    if (params === null) {
        return useQueryReactQuery(finalQuery, queryFn);
    }
    return useQueryReactQuery({
        queryKey: [finalQuery, params],
        queryFn,
    });
};

export default useQuery;
