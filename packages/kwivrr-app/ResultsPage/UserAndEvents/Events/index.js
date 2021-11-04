import React, { useCallback, useEffect, useState } from 'react';
import ResultQuery from 'kwivrr-ui/ResultQuery';
import Events from './Events';

import useQuery from 'kwivrr-hooks/useQuery';
import { debounce } from 'lodash';
import SearchItemFallback from '../../SearchItem/SearchItemFallback';

export default function (props) {
    const { searchTerm } = props;
    const [name, setName] = useState(searchTerm);
    const query = useQuery('getSearchEvents', { name });

    const changeName = useCallback(
        debounce((text) => {
            if (text.length > 0) {
                setName(text);
            }
        }, 900),
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
            Success={Events}
            Loading={SearchItemFallback}
            normalizeProps={(p) => {
                return {
                    ...p,
                    searchResults: p.data.data,
                };
            }}
            {...props}
        />
    );
}
