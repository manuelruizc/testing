const styles = () => {
    return {
        container: {
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 48,
            paddingBottom: 24,
            paddingHorizontal: 12,
        },
        divider: {
            marginVertical: 18,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
        addToWaitlist: {
            width: '64%',
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: '#70DAA0',
            height: 42,
        },
        addToWaitlistChecked: {
            backgroundColor: '#70DAA0',
        },
        checkMark: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '25%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonStyle: {
            width: '48%',
            marginTop: 32,
        },
        closeModal: {
            marginTop: 20,
            padding: 12,
        },
    };
};

export default styles;
