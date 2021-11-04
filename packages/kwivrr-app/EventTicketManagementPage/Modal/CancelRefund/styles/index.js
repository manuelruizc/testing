const styles = ({ screenHeight, screenWidth }) => {
    return {
        subHeader: {
            marginBottom: 24,
        },
        back: {
            marginBottom: 12,
        },
        buttonStyle: {
            width: 'auto',
            paddingHorizontal: 24,
            paddingVertical: 12,
            marginTop: 12,
        },
        containerRefundOptions: {
            flexDirection: 'row',
            width: '80%',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 12,
            paddingVertical: 4,
        },
        inputComponent: {
            width: '34%',
        },
        inputContainerLabel: {
            marginRight: 18,
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '50%',
        },
        inputStyle: {
            width: '100%',
            height: screenHeight * 0.034,
            backgroundColor: 'rgba(235, 235, 235, 0.5)',
            borderRadius: 8,
            marginBottom: 0,
            paddingHorizontal: 4,
            fontSize: 16,
        },
        inputComponentOptions: {
            width: '40%',
        },
        switchContainer: {
            width: '50%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },

        warningMessage: {
            width: '80%',
            textAlign: 'center',
            paddingVertical: 8,
        },
        blockDetails: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        cancel: {
            marginBottom: 24,
        },
        loadingContainer: {
            flex: 1,
            width: '100%',
            paddingVertical: '28%',
        },
        loading: {
            width: '100%',
            height: '100%',
            backgroundColor: 'green',
        },
    };
};

export default styles;
