const styles = ({ screenWidth }) => {
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
            marginBottom: 18,
        },
        inputStyle: {
            width: '100%',
            height: 40,
            backgroundColor: 'rgba(235, 235, 235, 0.5)',
            borderRadius: 8,
            marginBottom: 18,
            paddingLeft: 14,
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
        coverImageContainer: {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        avatarSelectMedia: {
            marginTop: 18,
        },
        coverUrlContainer: {
            width: '90%',
            marginTop: 18,
            paddingBottom: 18,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomColor: 'rgba(0, 0, 0, 0.1)',
            borderBottomWidth: 1,
        },
        verticalDivider: {
            height: '80%',
            width: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
        },
        uploadButton: {
            backgroundColor: '#3551A1',
        },
        inputsContainer: {
            paddingTop: 18,
            width: '94%',
        },
        addNewSpeakerContainer: {
            width: '100%',
            marginTop: 24,
            paddingVertical: 24,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: 'rgba(0, 0, 0, 0.1)',
        },
        saveStream: {
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 80,
        },
    };
};

export default styles;
