import React from 'react';
import ResultQuery from 'kwivrr-ui/ResultQuery';
import useQuery from 'kwivrr-hooks/useQuery';
import Shop from './Shop';
import ShopFallback from './ShopFallback';

export default function (props) {
    const { userId } = props;
    const query = useQuery('getPublicProfileProducts', { userId });
    return (
        <ResultQuery
            query={query}
            Success={Shop}
            Loading={ShopFallback}
            normalizeProps={(p) => {
                return {
                    ...p,
                    apiShopItems: p.data.data,
                };
            }}
            {...props}
        />
    );
}
