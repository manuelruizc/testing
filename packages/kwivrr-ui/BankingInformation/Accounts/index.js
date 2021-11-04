import React from 'react';
import ResultQuery from '../../ResultQuery';
import useQuery from 'kwivrr-hooks/useQuery';
import AccountSuccess from './AccountsSuccess';

export default function (props) {
    const query = useQuery('getBankingAccounts');
    return <ResultQuery query={query} Success={AccountSuccess} {...props} />;
}
