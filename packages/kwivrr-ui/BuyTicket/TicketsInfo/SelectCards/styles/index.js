const styles = ({ screenHeight }) => {
    return {
        container: {
            alignItems: 'flex-start',
            width: '90%',
            paddingHorizontal: 12,
            marginBottom: 28,
        },
        ccRadioButton: {
            marginBottom: 16,
        },
        ccLabelStyle: {
            marginLeft: 12,
        },
        inputs: {
            width: '90%',
            paddingHorizontal: 12,
            marginTop: 12,
        },
        inputContainer: {
            width: '100%',
        },
        inputStyle: {
            width: '100%',
            height: screenHeight * 0.045,
            backgroundColor: 'rgba(235, 235, 235, 0.5)',
            borderRadius: 8,
            marginBottom: 22,
            paddingLeft: 14,
        },
        doubleRow: {
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        doubleRowColumn: {
            width: '47%',
        },
        tripleRow: {
            width: '30%',
        },
        divider: {
            marginBottom: 12,
        },
        switchContainer: {
            width: '30%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        creditsToggle: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingVertical: 22,
        },
        creditLabel: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginLeft: 12,
        },
        kwivrrCreditsLogo: {
            width: 34,
            height: 34,
        },
    };
};

export default styles;
