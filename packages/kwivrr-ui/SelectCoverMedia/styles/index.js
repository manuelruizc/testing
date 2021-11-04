const styles = ({ palette }) => {
    return {
        image: {
            width: '100%',
            height: '100%',
        },
        activeButton: {
            position: 'absolute',
            top: -10,
            right: -10,
            borderRadius: 1000,
            backgroundColor: palette.button.primary,
            width: 36,
            height: 36,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.5)',
        },
        deleteButton: {
            position: 'absolute',
            top: -10,
            left: -10,
            borderRadius: 1000,
            backgroundColor: palette.button.primary,
            width: 36,
            height: 36,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.5)',
        },
        optionButtonFirst: {
            width: '50%',
            height: '100%',
            borderRightWidth: 1,
            borderRightColor: 'rgba(255, 255, 255, 0.2)',
        },
        optionButton: {
            width: '50%',
            height: '100%',
        },
    };
};

export default styles;
