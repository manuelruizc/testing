import React, { memo, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import useStyles from 'kwivrr-hooks/useStyles';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import TextHeader from 'kwivrr-ui/TextHeader';
import styles from './styles';

const attendeHeaders = [
    {
        key: 'streamTitle',
        label: 'Event',
        styling: 'eventHeaderRow',
        button: true,
    },
    {
        key: 'host',
        label: 'Host',
        styling: 'hostRow',
        button: true,
    },
    {
        key: 'dateTime',
        label: 'Date / Time',
        styling: 'dateTimeRow',
        button: true,
    },
    // {
    //     key: 'attendant',
    //     label: 'Attending',
    //     styling: 'attendingRow',
    //     button: true,
    // },
    {
        key: 'actions',
        label: 'Actions',
        styling: 'attendeeActionsRow',
        button: false,
    },
];
const headers = [
    {
        key: 'streamTitle',
        label: 'Event',
        styling: 'eventHeaderRow',
        button: true,
    },
    {
        key: 'dateTime',
        label: 'Date / Time',
        styling: 'dateTimeRow',
        button: true,
    },
    {
        key: 'attendant',
        label: 'Attending',
        styling: 'attendingRow',
        button: true,
    },
    {
        key: 'ticketsSold',
        label: 'General Tickets Sold',
        styling: 'generalTicketsSoldRow',
        button: true,
    },
    {
        key: 'vipTicketsSold',
        label: 'VIP Tickets Sold',
        styling: 'vipTicketsSoldRow',
        button: true,
    },
    {
        key: 'grossSales',
        label: 'Gross Sales',
        styling: 'grossSalesRow',
        button: true,
    },
    { key: 'actionss', label: 'Actions', styling: 'actionsRow', button: false },
];

function Header({ attendee, selectOrderData, orderBy }) {
    const classes = useStyles(styles);
    const mapHeaders = useMemo(
        () => (attendee ? attendeHeaders : headers),
        [attendee]
    );
    return (
        <View style={classes.headerRow}>
            {mapHeaders.map(({ key: _key, label, styling, button }) => {
                const iconName = useMemo(() => {
                    if (!orderBy) return 'align-justify';
                    const [key, order] = orderBy;
                    if (!order) return 'align-justify';
                    if (_key !== key) {
                        return 'align-justify';
                    }
                    if (order === 'ASC') return 'chevron-up';
                    return 'chevron-down';
                }, [orderBy]);
                if (button) {
                    return (
                        <TouchableOpacity
                            key={_key}
                            onPress={() => selectOrderData(_key)}
                            style={classes[styling]}
                        >
                            <TextHeader style={{ marginRight: 12 }} size={17}>
                                {label}
                            </TextHeader>
                            <KwivrrIcon
                                name={iconName}
                                color={
                                    iconName !== 'align-justify'
                                        ? 'black'
                                        : 'transparent'
                                }
                            />
                        </TouchableOpacity>
                    );
                }
                return (
                    <View key={_key} style={styling}>
                        <TextHeader size={17}>{label}</TextHeader>
                    </View>
                );
            })}
        </View>
    );
}
// refactor this
// add propTypes
// Header.propTypes = {
//     attendee,
//     selectOrderData,
//     orderBy
// }

export default memo(Header);
