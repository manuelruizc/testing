const styles = ({ screenWidth }) => {
    return {
        profileImage: {
            width: screenWidth * 0.36,
            height: screenWidth * 0.34,
            borderRadius: screenWidth * 0.36,
            // marginTop: 16
        },
        xButton: {
            position: 'absolute',
            top: 0,
            right: 0,
            padding: 8,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10000,
            transform: [
                {
                    translateX: 10,
                },
            ],
        },
        deleteButton: {
            position: 'absolute',
            top: 0,
            left: 0,
            padding: 8,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10000,
            transform: [
                {
                    translateX: 10,
                },
            ],
        },
        noImageContainer: {
            width: 144,
            height: 144,
            borderRadius: 144,
            backgroundColor: '#C9C9C9',
            justifyContent: 'center',
            alignItems: 'center',
        },
        deleteImage: {
            position: 'absolute',
            left: 0,
            right: -(14 / 2),
            height: 36,
            width: 36,
            backgroundColor: '#3551A1',
            overflow: 'hidden',
            borderWidth: 1,
            borderRadius: 80,
            borderColor: 'rgba(255, 255, 255, 0.6)',
        },
    };
};

export default styles;
