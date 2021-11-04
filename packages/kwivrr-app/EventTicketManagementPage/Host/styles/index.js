const styles = ({ screenWidth, screenHeight, palette }) => {
    return {
        container: {
            flex: 1,
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
        },
        contentContainerStyle: {
            flex: 1,
            width: '100%',
        },
        divider: {
            width: screenWidth * 0.9,
            marginLeft: screenWidth * 0.05,
            marginVertical: 24,
        },
        inputStyle: {
            width: screenWidth * 0.94,
            height: screenHeight * 0.045,
            backgroundColor: 'rgba(235, 235, 235, 0.5)',
            borderRadius: 8,
            marginBottom: 0,
            paddingHorizontal: 14,
        },
        inputStyleContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
        },
        content: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
        },
        tableHeadersContainer: {
            flexDirection: 'row',
        },
        tableHeader: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            paddingVertical: 18,
        },
        stickyColumns: {
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            borderRightWidth: 2,
            borderRightColor: '#F0F0F0',
        },
        stickyTableHeader: {
            backgroundColor: '#F0F0F0',
            height: 50,
            width: 68,
            justifyContent: 'center',
            alignItems: 'center',
        },
        stickyTableData: {
            paddingVertical: 18,
            height: 50,
            width: 68,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 2,
            borderBottomColor: '#F0F0F0',
        },
        radioButton: {
            borderRadius: 4,
            borderWidth: 1,
            backgroundColor: 'white',
        },
        orderIDColumn: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: screenWidth * 0.3,
        },
        ticketHolderColumn: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: screenWidth * 0.66,
        },
        ticketStatusColumn: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: screenWidth * 0.4,
        },
        purchasedByColumn: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: screenWidth * 0.66,
        },
        purchasedDateTimeColumn: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: screenWidth * 0.66,
        },
        ticketTypeColumn: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: screenWidth * 0.4,
        },
        ticketPriceColumn: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: screenWidth * 0.4,
        },
        credentialIDColumn: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: screenWidth * 0.4,
        },
        containerPlaceholder: {
            marginTop: 18,
            flex: 1,
            width: '100%',
            paddingHorizontal: 28,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
        },
        placeholder: {
            width: '100%',
            height: 28,
            marginBottom: 18,
            borderRadius: 1000,
            backgroundColor: palette.placeholder,
        },
    };
};

export default styles;
