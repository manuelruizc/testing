const styles = ({ screenWidth, screenHeight }) => {
    return {
        infoRow: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 8,
        },
        subTitle: {
            marginTop: 12,
            marginBottom: 22,
        },
        vipInfo: {
            marginBottom: 22,
        },
        inputStyle: {
            width: '100%',
            height: screenHeight * 0.045,
            backgroundColor: 'rgba(235, 235, 235, 0.5)',
            borderRadius: 8,
            marginBottom: 0,
            paddingHorizontal: 14,
            fontSize: 16,
        },
        bottomForm: {
            width: '86%',
            marginTop: 32,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
        },
        infoContainer: {
            width: '70%',
        },
        radioButtons: {
            width: '80%',
        },
        buttonStyle: {
            width: 'auto',
            paddingHorizontal: 42,
            paddingVertical: 12,
            marginVertical: 42,
        },
        cancel: {
            marginBottom: 48,
        },
    };
};

export default styles;
