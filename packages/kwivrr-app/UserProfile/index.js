import React from 'react';
import ResultQuery from 'kwivrr-ui/ResultQuery';
import useQuery from 'kwivrr-hooks/useQuery';
import UserProfile from './UserProfile';
import { View } from 'react-native';

export default function (props) {
    const { userId } = props.route.params;
    const query = useQuery('getUserProfile', { id: userId });
    return (
        <ResultQuery
            Success={UserProfile}
            query={query}
            normalizeProps={(p) => {
                return {
                    userProfile: p,
                };
            }}
            {...props}
        />
    );
}
