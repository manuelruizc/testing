const styles = ({ dwPercentage }) => {
    return {
        container: {
            width: '100%',
            alignItems: 'center',
        },

        ticketInfo: {
            width: '70%',
            marginVertical: 12,
            marginBottom: 6,
        },
        kwivrrCreditsLogo: {
            width: 34,
            height: 34,
        },
        inputStyle: {
            width: dwPercentage(80),
            height: 40,
            backgroundColor: 'rgba(235, 235, 235, 0.5)',
            borderRadius: 8,
            marginBottom: 18,
            paddingLeft: 14,
        },
        noTicketsAvailableContainer: {
            paddingBottom: 12,
            paddingVertical: 12,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        noTicketsText: {
            textAlign: 'center',
        },
        button: {
            width: '50%',
        },
        authButton: {
            marginBottom: 36,
            marginTop: 24,
        },
    };
};

export default styles;
