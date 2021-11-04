import TextRegular from 'kwivrr-ui/TextRegular';
import React from 'react';
import { View } from 'react-native';
import KwivrrTable from 'kwivrr-ui/KwivrrTable';

const headers = [
    {
        label: 'Purchaser First Name',
        key: 'purchaserFirstName',
    },
    {
        label: 'Purchaser Last Name',
        key: 'purchaserLastName',
    },
    {
        label: 'Purchaser Email',
        key: 'purchaserEmail',
    },
    {
        label: 'Purchaser User ID',
        key: 'purchaserUserID',
    },
    {
        label: 'Attendee First Name',
        key: 'attendeeFirstName',
    },
    {
        label: 'Attendee Last Name',
        key: 'attendeeLastName',
    },
    {
        label: 'Attendee Email',
        key: 'attendeeEmail',
    },
    {
        label: 'Attendee User ID',
        key: 'attendeeUserID',
    },
    {
        label: 'Host Name',
        key: 'hostName',
    },
    {
        label: 'Host Email',
        key: 'hostEmail',
    },
    {
        label: 'Event ID',
        key: 'eventID',
    },
    {
        label: 'Event Name',
        key: 'eventName',
    },
    {
        label: 'Ticket Type',
        key: 'ticketType',
    },
    {
        label: 'Ticket Price',
        key: 'ticketPrice',
    },
    {
        label: 'Preferred Language',
        key: 'preferredLanguage',
    },
];

function AttendeeHistoryReport({ data }) {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
            }}
        >
            <KwivrrTable headers={headers} data={data} />
        </View>
    );
}

export default AttendeeHistoryReport;
