const styles = ({ screenWidth }) => {
    return {
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: 'rgba(0, 0, 0, 0.15)'
        },
        touchable: {
            width: screenWidth / 3,
            height: 82,
            justifyContent: 'center',
            alignItems: 'center'
        },
        selector: {
            width: '18%',
            height: '100%',
            backgroundColor: 'black',
            borderRadius: 1000
        }
    }
}

export default styles;
