const styles = ({ screenHeight }) => {
    return {
        container: {
            width: '100%',
            height: screenHeight * 0.7,
            paddingVertical: 60,
        },
        // parent container
        userContainer: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 18,
            marginBottom: 8,
        },
        userInfoContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        avatarContainer: {
            width: 42,
            height: 42,
            borderRadius: 42,
            overflow: 'hidden',
            marginRight: 12,
        },
        avatar: {
            width: '100%',
            height: '100%',
            borderRadius: 42,
        },
        actionsContainer: {
            flexDirection: 'row',
        },
    };
};

export default styles;
