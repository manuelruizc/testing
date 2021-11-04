const styles = ({ dwPercentage }) => {
    return {
        container: {
            width: '100%',
            alignItems: 'center',
            paddingBottom: 32,
        },
        options: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 24,
            zIndex: 0,
        },
        option: {
            width: '45%',
            height: 30,
            borderWidth: 1,
            borderColor: 'rgba(0, 0, 0, 0.3)',
            borderRadius: 8,
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
        },
        logo: {
            width: '60%',
            height: '100%',
        },
        inputStyle: {
            width: '100%',
            height: 40,
            backgroundColor: 'rgba(235, 235, 235, 0.5)',
            borderRadius: 8,
            marginBottom: 18,
            paddingLeft: 14,
        },
        buttonContainerStyle: {
            width: 'auto',
            marginTop: 18,
        },
        buttonStyle: {
            paddingHorizontal: 42,
        },
        cancelContainer: {
            paddingTop: 24,
        },
    };
};

export default styles;
