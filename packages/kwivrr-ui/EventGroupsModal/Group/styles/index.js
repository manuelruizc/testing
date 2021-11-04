const styles = ({ palette }) => {
    return {
        container: {
            width: '100%',
            paddingHorizontal: 12,
            height: 42,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        options: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        trash: {
            marginLeft: 8,
        },
        input: {
            width: '100%',
            height: 42,
            backgroundColor: palette.input.backgroundColor,
            borderRadius: 8,
        },
    };
};

export default styles;
