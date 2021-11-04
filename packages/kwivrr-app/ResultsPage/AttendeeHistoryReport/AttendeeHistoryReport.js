import React from 'react';
import { View } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import KwivrrTable from 'kwivrr-ui/KwivrrTable/Table';

const headers = [
    {
        label: 'Name',
        key: 'name',
    },
    {
        label: 'User ID',
        key: 'userID',
    },
    {
        label: 'Email',
        key: 'email',
    },
];

function AttendeeHistoryReport({ data }) {
    const classes = useStyles(styles);
    return (
        <View style={classes.container}>
            <KwivrrTable headers={headers} data={data} />
        </View>
    );
}

export default AttendeeHistoryReport;
