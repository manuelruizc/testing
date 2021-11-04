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
        surveysContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '90%',
            paddingVertical: 8,
        },
        deleteSurveyIcon: {
            borderRadius: 100000,
            padding: 4,
            backgroundColor: 'red',
        },
        addNewSpeakerContainer: {
            width: '100%',
            marginTop: 0,
            paddingBottom: 12,
            borderColor: 'rgba(0, 0, 0, 0.1)',
        },
    };
};

export default styles;
