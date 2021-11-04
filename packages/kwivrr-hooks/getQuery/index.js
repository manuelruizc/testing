import React from 'react';
import queries from 'kwivrr-common/queries';

const getQuery = (query) => {
    return queries[query];
};

export default getQuery;
