const styles = ({ label, screenWidth, OS }) => {
    return {
        buttonContainer: {
            flex: 1,
            height: '100%',
            width: screenWidth / 5,
            justifyContent: 'center',
            alignItems: 'center',
        },
        button: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        bottomBarItem: {
            width: OS === 'ios' ? 40 : 36,
            height: OS === 'ios' ? 40 : 36,
            borderRadius: OS === 'ios' ? 40 : 36,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
        },
        icon: {
            marginLeft: label === 'Upload' ? 1 : 0,
        },
        gradient: {
            position: 'absolute',
            top: 0,
            left: 0,
        },
    };
};

export default styles;
