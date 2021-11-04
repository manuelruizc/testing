const styles = ({ screenWidth, isAndroid, palette }) => {
    return {
        container: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: 'white',
        },
        toggleHeader: {
            width: screenWidth,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 24,
            paddingTop: 8,
            marginBottom: 18,
        },
        inputStyle: {
            width: '100%',
            height: 40,
            backgroundColor: 'rgba(235, 235, 235, 0.5)',
            borderRadius: 8,
            marginBottom: 18,
            paddingLeft: 6,
        },
        inputStyleDescription: {
            width: '100%',
            height: 120,
            backgroundColor: 'rgba(235, 235, 235, 0.5)',
            borderRadius: 8,
            marginBottom: 18,
            paddingLeft: 14,
        },
        profileImage: {
            width: screenWidth * 0.36,
            height: screenWidth * 0.34,
            borderRadius: screenWidth * 0.36,
            marginTop: 16,
        },
        additionalSpeakers: {
            width: '100%',
            marginTop: 24,
            paddingVertical: 24,
            borderTopWidth: 1,
            borderColor: 'rgba(0, 0, 0, 0.1)',
        },
        authButton: {
            width: '48%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        authButtonPadding: {
            height: 62,
            justifyContent: 'center',
            alignItems: 'center',
        },
        scrollContainer: {
            flex: 1,
            width: screenWidth,
        },
        scrollView: {
            flex: 1,
            paddingTop: 12,
        },
        contentContainerStyle: {
            flexGrow: 1,
            alignItems: 'center',
            paddingBottom: isAndroid ? 150 : 60,
        },
        loadingTopLayer: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: palette.common.white,
        },
        topInfo: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingTop: 12,
        },
        section: {
            width: '100%',
            marginBottom: 12,
            alignItems: 'center',
        },
        divider: {
            width: '90%',
            height: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
        expandButton: {
            paddingHorizontal: 12,
            paddingVertical: 12,
            justifyContent: 'center',
            alignItems: 'center',
        },
    };
};

export default styles;
