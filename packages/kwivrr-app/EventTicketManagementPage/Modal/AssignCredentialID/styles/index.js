const styles = ({ screenHeight }) => {
    const commonHeight = screenHeight * 0.045;
    return {
        inputStyle: {
            width: '100%',
            height: commonHeight,
            backgroundColor: 'rgba(235, 235, 235, 0.5)',
            borderRadius: 8,
            marginBottom: 0,
            paddingHorizontal: 14,
            fontSize: 16,
        },
        switchContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: commonHeight,
        },
        buttonStyle: {
            width: 'auto',
            paddingHorizontal: 42,
            paddingVertical: 12,
            marginVertical: 12,
            marginBottom: 22,
        },
        orderContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            width: '90%',
            marginBottom: 22,
        },
        infoContainer: {
            flexDirection: 'row',
            width: '92%',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginTop: 12,
        },
        subHeader: {
            marginBottom: 12,
        },
        back: {
            marginBottom: 18,
        },
    };
};

export default styles;
