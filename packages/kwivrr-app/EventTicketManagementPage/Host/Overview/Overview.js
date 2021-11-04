import TextHeader from 'kwivrr-ui/TextHeader';
import React from 'react';
import { View } from 'react-native';
import OverviewCard from './OverviewCard/OverviewCard';

function Overview({ info }) {
    return (
        <React.Fragment>
            <OverviewCard type="Revenue" info={info} />
            <OverviewCard type="CheckIn" title="Checked In" info={info} />
        </React.Fragment>
    );
}

export default Overview;
