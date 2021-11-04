const styles = ({ screenWidth }) => {
    return {
        header: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 22,
            marginBottom: 18,
        },
        attendedEvents: {
            width: screenWidth,
        },
        title: {
            textTransform: 'uppercase',
        },
    };
};

export default styles;
