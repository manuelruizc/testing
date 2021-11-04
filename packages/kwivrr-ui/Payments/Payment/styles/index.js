const styles = () => {
    return {
        container: {
            width: '100%',
            height: 42,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
        },
        paymentContainer: {
            flex: 1,
            height: '100%',
            borderWidth: 1,
            borderColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: 6,
            marginRight: 24,
            overflow: 'hidden',
        },
        touchablePayment: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
        },
        touchableOpacity: {
            width: '100%',
            height: '100%',
        },
        paymentContent: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 8,
            height: '100%',
        },
        cardInfo: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: '100%',
        },
        bankLogo: {
            height: '80%',
            width: 40,
            marginRight: 12,
            justifyContent: 'center',
            alignItems: 'center',
        },
        defaultLabel: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        defaultLabelText: {
            marginRight: 8,
        },
        deleteButton: {
            padding: 8,
            borderRadius: 30,
            marginRight: -8,
        },
        handler: {
            width: '52%',
        },
    };
};

export default styles;
