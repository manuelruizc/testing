const styles = ({ screenHeight, palette }) => {
    return {
        container: {
            paddingBottom: 12,
            paddingHorizontal: 36,
            width: '100%',
            alignItems: 'center',
        },
        doubleRow: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        doubleRow2: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginTop: 36,
        },
        doubleRow3: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end',
            marginTop: 24,
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
        buttonStyle: {
            width: '84%',
            paddingVertical: 12,
            marginVertical: 42,
        },
        cancel: {
            marginBottom: 48,
        },
        uploadButton: {
            backgroundColor: palette.button.primary,
        },
    };
};

export default styles;
