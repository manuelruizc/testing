import React, { useEffect } from 'react';
import ResultQuery from 'kwivrr-ui/ResultQuery';
import useQuery from 'kwivrr-hooks/useQuery';
import Overview from './Overview';
import OverviewCard from './OverviewCard/OverviewCard';
import { View } from 'react-native';

export default function (props) {
    const { fireRefetch } = props;
    const query = useQuery('getEventOverview', { id: props.eventId });

    useEffect(() => {
        if (fireRefetch) {
            query.refetch();
        }
    }, [fireRefetch]);

    return (
        <ResultQuery
            query={query}
            Success={Overview}
            Loading={OverviewFallback}
            normalizeProps={(p) => {
                return {
                    info: p.data.data.attributes,
                };
            }}
            {...props}
        />
    );
}

const OverviewFallback = () => {
    return (
        <React.Fragment>
            <View style={{ height: 320 }} />
        </React.Fragment>
    );
};
