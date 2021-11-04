import React, { useCallback, useEffect, useState } from 'react';
import ResultQuery from 'kwivrr-ui/ResultQuery';
import Users from './Users';

import useQuery from 'kwivrr-hooks/useQuery';
import { debounce } from 'lodash';
import SearchItemFallback from '../../SearchItem/SearchItemFallback';

export default function (props) {
    const { searchTerm } = props;
    const [name, setName] = useState(searchTerm);
    const query = useQuery('getSearchUsers', { search: name });

    const changeName = useCallback(
        debounce((text) => setName(text), 900),
        [setName]
    );

    useEffect(() => {
        if (searchTerm.length > 0) {
            changeName(searchTerm);
        }
    }, [searchTerm]);

    return (
        <ResultQuery
            query={query}
            Success={Users}
            Loading={SearchItemFallback}
            normalizeProps={(p) => {
                return {
                    ...p,
                    searchResults: p.data.included,
                };
            }}
            {...props}
        />
    );
}
