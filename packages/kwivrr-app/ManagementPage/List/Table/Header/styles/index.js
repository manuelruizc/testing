const styles = ({ screenWidth }) => {
    return {
        headerRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: '#F0F0F0',
            backgroundColor: '#F0F0F0',
            paddingVertical: 12,
            paddingLeft: 14,
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingVertical: 12,
            paddingLeft: 14,
            borderBottomWidth: 1,
            borderBottomColor: '#F0F0F0',
        },
        eventHeaderRow: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: screenWidth * 0.64,
        },
        eventRow: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: screenWidth * 0.64,
            paddingRight: 18,
        },
        eventRowImage: {
            width: screenWidth * 0.12,
            height: 37,
            borderRadius: 10,
            overflow: 'hidden',
            marginRight: 12,
        },
        hostRow: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: screenWidth * 0.5,
        },
        dateTimeRow: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: screenWidth * 0.58,
        },
        attendingRow: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: screenWidth * 0.4,
        },
        generalTicketsSoldRow: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: screenWidth * 0.6,
        },
        vipTicketsSoldRow: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: screenWidth * 0.5,
        },
        grossSalesRow: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: screenWidth * 0.4,
        },
        actionsRow: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: screenWidth * 0.6,
        },
        attendeeActionsRow: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: screenWidth * 0.6,
        },
    };
};

export default styles;
