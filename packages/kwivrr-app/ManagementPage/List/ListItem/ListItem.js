import React, { memo, useState } from 'react';
import { View } from 'react-native';
import Table from '../Table';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import TextRegular from 'kwivrr-ui/TextRegular';
import TextHeader from 'kwivrr-ui/TextHeader';

function ListItem({ events: eventsApi, ...rest }) {
    const [events, setEvents] = useState(eventsApi);
    const classes = useStyles(styles);
    if (events.length === 0) {
        return (
            <View style={classes.container}>
                <TextHeader size={18}>{rest.title}</TextHeader>
                <TextRegular style={classes.label} size={16}>
                    There are no events
                </TextRegular>
            </View>
        );
    }
    return <Table {...rest} setEvents={setEvents} tableData={events} />;
}

export default ListItem;
