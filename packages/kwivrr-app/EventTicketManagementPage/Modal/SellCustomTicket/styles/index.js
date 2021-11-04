const styles = ({ screenHeight }) => {
    return {
        container: {
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        ticketInfoContainer: {
            width: '55%',
            alignItems: 'center',
            marginBottom: 28,
        },
        bottomForm: {
            width: '94%',
            marginTop: 32,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
        },
        ticketInfo: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 12,
        },
        inputStyle: {
            width: '100%',
            height: screenHeight * 0.045,
            backgroundColor: 'rgba(235, 235, 235, 0.5)',
            borderRadius: 8,
            marginBottom: 0,
            paddingLeft: 14,
        },
        bottomOptions: {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 32,
        },
        autocompleteContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderColor: 'rgba(0, 0, 0, 0.1)',
            paddingVertical: 24,
        },
        autocompleteInputContainer: {
            width: '80%',
        },
    };
};

export default styles;
