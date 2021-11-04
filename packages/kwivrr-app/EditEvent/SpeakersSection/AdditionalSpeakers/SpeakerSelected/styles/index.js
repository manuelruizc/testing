const styles = ({ palette }) => {
    return {
        container: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        avatar: {
            marginRight: 18,
        },
        imageContainer: {
            width: 42,
            height: 42,
            overflow: 'hidden',
            borderRadius: 100,
            backgroundColor: palette.placeholder,
            marginRight: 6,
        },
        nameInitialContainer: {
            position: 'absolute',
            overflow: 'hidden',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
    };
};

export default styles;
