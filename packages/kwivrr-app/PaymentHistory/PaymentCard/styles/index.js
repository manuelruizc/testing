const styles = () => {
    return {
        container: {
            width: '90%',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: 'rgba(0, 0, 0, 0.2)',
            paddingVertical: 12,
            paddingHorizontal: 14,
            marginBottom: 12,
        },
        topInfo: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginBottom: 18,
        },
        eventImage: {
            width: 80,
            height: 54,
            borderRadius: 8,
            marginRight: 12,
        },
        eventInfo: {
            height: 54,
            flex: 1,
            justifyContent: 'space-evenly',
        },
        title: {
            width: '100%',
        },
        paymentStatus: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
        },
        paymentStatusInfo: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        status: {
            marginRight: 6,
            textTransform: 'uppercase',
        },
        paymentAccount: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        paymentAccountLogo: {
            width: 24,
            height: 24,
            marginRight: 12,
        },
        handler: {
            marginRight: 12,
        },
    };
};

export default styles;
