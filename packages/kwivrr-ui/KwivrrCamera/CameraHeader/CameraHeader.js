import React from 'react';
import { View, Platform, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import Touchable from 'kwivrr-ui/Touchable';
import KwivrrIcon from '../../KwivrrIcon';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from '../styles';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

function CameraHeader({
    closeModal,
    pictureBeenTaken,
    setFlashMode,
    flashMode,
    degrees,
}) {
    const classes = useStyles(styles);
    const buttonStyles = useAnimatedStyle(() => {
        return {
            width: Platform.OS === 'ios' ? 50 : 40,
            height: Platform.OS === 'ios' ? 50 : 40,
            borderRadius: Platform.OS === 'ios' ? 50 : 40,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.5)',
            // transform: [
            //     {
            //         rotate: degrees.value + "deg"
            //     }
            // ]
        };
    });
    const _buttonStyles = useAnimatedStyle(() => {
        return {
            width: Platform.OS === 'ios' ? 50 : 40,
            height: Platform.OS === 'ios' ? 50 : 40,
            borderRadius: Platform.OS === 'ios' ? 50 : 40,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.5)',
            // transform: [
            //     {
            //         rotate: degrees.value + "deg"
            //     }
            // ]
        };
    });
    return (
        <View style={classes.cameraHeader}>
            <View style={{ width: 50 }} />
            <TouchableOpacity
                style={classes.regularButton}
                disabled={pictureBeenTaken}
                onPress={() =>
                    setFlashMode((prev) =>
                        prev === Camera.Constants.FlashMode.off
                            ? Camera.Constants.FlashMode.on
                            : Camera.Constants.FlashMode.off
                    )
                }
            >
                <KwivrrIcon
                    name={
                        flashMode === Camera.Constants.FlashMode.off
                            ? 'zap-off'
                            : 'zap'
                    }
                    color="white"
                    size={24}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={closeModal}
                style={classes.regularButton}
            >
                <KwivrrIcon name="x" color="white" size={26} />
            </TouchableOpacity>
        </View>
    );
}

export default CameraHeader;
