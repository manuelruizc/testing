const HEIGHT_16_9 = 0.5625;
const styles = ({ screenWidth, dhPercentage, isiOS }) => {
    return {
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'white',
        },
        logo: {
            width: 80,
            height: 80,
            marginBottom: 12,
        },
        viewerStatusContainer: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 18,
            backgroundColor: 'white',
            position: 'relative',
        },
        liveBug: {
            marginTop: 0,
        },
        viewersContainer: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingVertical: 4,
            borderRadius: 10000,
            paddingLeft: 8,
            paddingRight: 16,
            marginLeft: 18,
        },
        viewerCount: {
            marginLeft: 6,
        },
        closeButton: {
            padding: 8,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 1000,
            position: 'absolute',
            top: 12,
            right: 12,
        },

        videoContainer: {
            width: screenWidth,
            height: screenWidth * HEIGHT_16_9,
            backgroundColor: 'black',
        },
        webView: {
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
        },

        shareContainer: {
            width: '90%',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            borderRadius: 12,
        },
        closeContainer: {
            width: '100%',
            alignItems: 'flex-end',
            justifyContent: 'center',
        },
        shareCloseButton: {
            padding: 6,
            justifyContent: 'center',
            alignItems: 'center',
        },
        shareText: {
            paddingVertical: 12,
        },
        shareOptions: {
            flexDirection: 'row',
            width: '90%',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 24,
            paddingBottom: 32,
        },
        socialIcon: {
            width: 48,
            height: 48,
            borderRadius: 10,
        },

        bottomOptions: {
            width: '88%',
        },
        messaging: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            paddingBottom: 46 + 12,
        },
        messagesContainer: {
            width: '85%',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: 12,
            height: isiOS ? dhPercentage(38) : dhPercentage(32),
            justifyContent: 'center',
            alignItems: 'center',
        },
        rightOptions: {
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        regular: {
            padding: 9,
            borderRadius: 10000,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 8,
        },
        sendMessage: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 12,
        },
        messageInput: {
            width: '84%',
            height: 46,
            borderRadius: 10000,
            borderWidth: 1,
            borderColor: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
        },
        send: {
            padding: 8,
            borderRadius: 10000,
            backgroundColor: '#3551A1',
        },
        webViewContainer: {
            backgroundColor: 'black',
        },
    };
};

export default styles;
