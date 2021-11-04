const styles = ({ screenHeight, isAndroid, dhPercentage }) => {
    return {
        eventImage: {
            width: '100%',
            height: dhPercentage(50) * 0.65,
        },
        image: {
            width: '100%',
            height: '100%',
        },
    };
};

export default styles;
