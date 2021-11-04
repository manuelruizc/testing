const HEIGHT_16_9 = 0.5625;
const styles = ({ dwPercentage, dhPercentage, coverWidth, avatarSize }) => {
    return {
        container: {
            width: dwPercentage(90),
            marginTop: dhPercentage(7),
        },
        coverUrl: {
            width: dwPercentage(90),
            height: dwPercentage(90) * HEIGHT_16_9,
        },
        cover: {
            width: '100%',
            height: '100%',
        },
        image: {
            borderRadius: 8,
        },
        avatarContainer: {
            position: 'absolute',
            top: '-25%',
            left: 0,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'green',
        },
        avatar: {
            position: 'absolute',
            left: coverWidth * 0.5 - avatarSize / 2,
            opacity: coverWidth ? 1 : 0,
            top: '-25%',
        },
    };
};

export default styles;
