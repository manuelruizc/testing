const styles = () => {
    return {
        container: {
            alignItems: 'center',
            width: '100%',
        },
        infoContainer: {
            width: '100%',
            alignItems: 'center',
        },
        scrollViewContainer: {
            width: '90%',
            height: '84%',
        },
        subHeader: {
            marginTop: 0,
            marginBottom: 24,
        },
        eventRow: {
            width: '84%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginBottom: 18,
        },
        eventIcon: {
            marginRight: 16,
        },
        eventInfoContainer: {
            justifyContent: 'center',
            alignItems: 'flex-start',
        },
        close: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            paddingVertical: 18,
            justifyContent: 'center',
            alignItems: 'center',
        },
    };
};

export default styles;
