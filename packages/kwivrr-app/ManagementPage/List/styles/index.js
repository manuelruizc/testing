const styles = ({ screenWidth, palette }) => {
    return {
        container: {
            flex: 1,
            width: screenWidth,
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: screenWidth,
        },
        containerLoader: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        scrollView: {
            flex: 1,
        },
        scrollViewContentContainer: {
            paddingBottom: 48,
        },
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
        hello: {
            width: '100%',
            marginTop: 8,
            paddingLeft: 18,
            paddingVertical: 16,
        },
        itemContainerPlaceholder: {
            width: screenWidth * 0.9,
            height: 40,
            marginVertical: 8,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        imageFallback: {
            width: screenWidth * 0.12,
            height: 37,
            borderRadius: 10,
            overflow: 'hidden',
            marginRight: 12,
            backgroundColor: palette.placeholder,
        },
        headerPlaceholder: {
            width: screenWidth * 0.9,
            height: 32,
            borderRadius: 8,
            backgroundColor: palette.placeholder,
            marginTop: 24,
        },
        dataPlaceholder: {
            width: screenWidth * 0.75,
            height: 38,
            borderRadius: 8,
            backgroundColor: palette.placeholder,
        },
    };
};

export default styles;
