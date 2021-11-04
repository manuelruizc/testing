import React from 'react';
import ResultQuery from 'kwivrr-ui/ResultQuery';
import UserAndEvents from './UserAndEvents';

import useQuery from 'kwivrr-hooks/useQuery';
import { ScrollView } from 'react-native';
import Events from './Events';
import Header from '../Header';
import Users from './Users';

export default function (props) {
    return (
        <React.Fragment>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header title="Events" />
                <Events searchTerm={props.searchTerm} />
                <Header title="Users" />
                <Users searchTerm={props.searchTerm} />
            </ScrollView>
        </React.Fragment>
    );
}
