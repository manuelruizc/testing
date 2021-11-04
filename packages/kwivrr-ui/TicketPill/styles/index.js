const styles = ({ OS, screenWidth, dwPercentage, dhPercentage }) => {
    const isAndroid = OS === 'android';
    return {
        pillContainer: {
            width: dwPercentage(isAndroid ? 11 : 13),
            paddingVertical: dhPercentage(isAndroid ? 0.4 : 0.6),
            flexDirection: 'row',
            borderRadius: 1000,
            justifyContent: 'center',
            alignItems: 'center',
        },
    };
};

export default styles;
