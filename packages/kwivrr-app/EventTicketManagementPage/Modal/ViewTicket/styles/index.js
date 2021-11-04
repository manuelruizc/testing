const styles = ({ screenWidth }) => {
    return {
        container: {
            width: '100%',
            justifyContent: 'space-between',
            height: '100%',
        },
        subContainer: {
            alignItems: 'center',
            width: '100%',
        },
        title: {
            marginVertical: 24,
        },
        infoContainer: {
            marginBottom: 12,
            width: '80%',
        },
        label: {
            marginBottom: 4,
        },
        value: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        chargeInfoRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginVertical: 6,
        },
        paymentDetailsRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginVertical: 6,
        },
        paymentKey: {
            marginRight: 4,
        },
        closeModalContainer: {
            width: '100%',
            paddingVertical: 32,
            alignItems: 'center',
            justifyContent: 'center',
        },
        imageContainer: {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        image: {
            width: screenWidth * 0.8,
            height: screenWidth * 0.8,
        },
    };
};

export default styles;
