const styles = ({
    screenWidth,
    dhPercentage,
    dwPercentage,
    isAndroid,
    isioOs,
}) => {
    return {
        scrollViewContainer: {
            width: '100%',
            paddingBottom: 80,
        },
        scrollViewContentContainer: {
            alignItems: 'center',
            paddingBottom: 80,
        },
        userNameInfo: {
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        editIcon: {
            position: 'absolute',
            top: -2,
            right: 32,
        },
        title: {
            marginBottom: dhPercentage(isAndroid ? 2 : 4),
        },
        textBody: {
            marginBottom: dhPercentage(isAndroid ? 0 : 2),
        },
        profileImageContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 18,
        },
        divider: {
            width: '90%',
            borderTopWidth: 2,
            borderColor: 'rgba(0, 0, 0, 1)',
            opacity: 0.06,
            marginVertical: dhPercentage(3),
        },
        inputStyle: {
            width: dwPercentage(80),
            height: 40,
            backgroundColor: 'rgba(235, 235, 235, 0.5)',
            borderRadius: 8,
            marginBottom: 18,
            paddingLeft: 14,
        },
        emailInputStyle: {
            width: '80%',
        },
        avatarSelection: {
            marginTop: 18,
        },
        inputContainer: {
            width: '100%',
        },
        authButton: {
            width: '80%',
        },
        nonEditingEmail: {
            marginBottom: dhPercentage(isAndroid ? 0 : 2),
        },
        emailEditingContainer: {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
        },
        nonEditingTagline: {
            width: dwPercentage(80),
            marginBottom: dhPercentage(2.65),
        },
        nonEditingTaglineLabel: {
            marginBottom: dhPercentage(2.65),
        },

        containerPasswordChange: {
            paddingBottom: 24,
        },
        modalStyle: {
            marginTop: -80,
        },
        changePassword: {
            marginTop: dhPercentage(4),
        },
        addBanking: {
            paddingVertical: 12,
        },
        addBankingText: {
            paddingVertical: 8,
        },
    };
};

export default styles;
