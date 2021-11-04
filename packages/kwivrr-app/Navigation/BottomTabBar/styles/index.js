const styles = ({ screenWidth, screenHeight, OS }) => {
    return {
        container: {
            flexDirection: 'row',
            height: OS === 'ios' ? 80 : screenHeight * 0.08,
            width: '100%',
            paddingBottom: OS === 'ios' ? 18 : 0,
            borderTopWidth: 1,
            borderTopColor: 'rgba(0, 0, 0, 0.1)',
        },
        iconContainer: {
            width: 40,
            height: 40,
            borderRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
        },
        barIndicator: {
            width: '38%',
            height: '100%',
            backgroundColor: 'black',
            borderRadius: 100000,
        },
    };
};

export default styles;
