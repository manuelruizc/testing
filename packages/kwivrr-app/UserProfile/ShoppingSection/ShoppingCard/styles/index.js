const styles = ({ screenWidth }) => {
    return {
        shoppingCard: {
            width: screenWidth * 0.52,
            borderWidth: 2,
            borderColor: 'rgba(0, 0, 0, 0.15)',
            borderRadius: 8,
        },
        shoppingCardImage: {
            width: '100%',
            height: screenWidth * 0.36,
        },
        shoppingInfo: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 12,
        },
        shoppingButton: {
            paddingHorizontal: 8,
            paddingVertical: 3,
            backgroundColor: 'rgb(211, 105, 99)',
        },
        shoppingIcons: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
    };
};

export default styles;
