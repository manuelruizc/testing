const styles = ({ OS }) => {
    return {
        cameraHeader: {
            width: '100%',
            height: 100,
            flexDirection: 'row',
            paddingHorizontal: 18,
            justifyContent: 'space-between',
            alignItems: 'center',            
        },
        container: {
            flex: 1,
            position:'relative'
        },
        camera: {
            flex: 1,
            backgroundColor: 'lightgreen'
        },
        buttonContainer: {
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            margin: 20,
            borderWidth: 2,
            borderColor: 'red'
        },
        button: {
            flex: 0.1,
            alignSelf: 'flex-end',
            alignItems: 'center',
        },
        text: {
            fontSize: 18,
            color: 'white',
        },
        recordButton: {
            width: 70,
            height: 70,
            borderRadius: 70,
            justifyContent: 'center',
            alignItems: 'center'
        },
        recordButtonBackground: {
            position:'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: 10000,
            overflow: 'hidden'
        },
        recColor: {
            width: '88%',
            height: '88%',
            backgroundColor: '#F54748',
            borderRadius: 10000
        },
        regularButton: {
            width: OS === 'ios' ? 50 : 40,
            height: OS === 'ios' ? 50 : 40,
            borderRadius: OS === 'ios' ? 50 : 40,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.5)'
        },
        regularBtn: {
            width: '100%',
            height: '100%'
        },
        closeCamera: {
            width: OS === 'ios' ? 50 : 40,
            height: OS === 'ios' ? 50 : 40,
            borderRadius: OS === 'ios' ? 50 : 40,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.5)'
        },
        cameraFooter: {
            width: '100%',
            height: 100,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
        },
        pictureTakenOptions: {
            width: '100%',
            position: 'absolute',
            flexDirection: 'row',
            bottom: 0,
            left: 0,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 28,
            paddingHorizontal: 40
        }
    }
}

export default styles;
