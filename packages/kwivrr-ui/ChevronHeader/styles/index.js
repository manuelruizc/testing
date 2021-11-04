const styles = ({ screenWidth }) => {
    return {
        toggleHeader: {
            width: screenWidth,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 24,
            paddingTop: 8,
            marginBottom: 18,
        },
    };
};

export default styles;
