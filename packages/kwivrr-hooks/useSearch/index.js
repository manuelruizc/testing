import { SearchContext } from 'kwivrr-common/SearchContext';
import React, { useContext } from 'react';

function useSearch() {
    return useContext(SearchContext);
}

export default useSearch;
