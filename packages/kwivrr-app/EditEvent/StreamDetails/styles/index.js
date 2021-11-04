const styles = () => {
    return {
        inputContainer: {
            width: '100%',
        },
        inputStyle: {
            width: '100%',
            height: 40,
            backgroundColor: 'rgba(235, 235, 235, 0.5)',
            borderRadius: 8,
            marginBottom: 18,
            paddingLeft: 14,
        },
        providerTitle: {
            marginBottom: 18,
        },
        switchContainer: {
            flexDirection: 'row',
            width: 150,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
        },
        switchTitle: {
            marginRight: 18,
        },
        ticketsView: {
            width: '100%',
        },
        eventTypeSelectorContainer: {
            flexDirection: 'row',
            width: '94%',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        eventTypeSwitch: {
            marginRight: 18,
        },
        eventTypeSwitchLabel: {
            marginRight: 12,
        },
    };
};

export default styles;
