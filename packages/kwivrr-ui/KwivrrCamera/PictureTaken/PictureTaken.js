import React, { useEffect } from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import Animated, {
    Extrapolate,
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import Touchable from '../../Touchable';
import styles from '../styles';
import KwivrrIcon from '../../KwivrrIcon';

function PictureTaken({
    pictureUrl,
    setPictureBeenTaken,
    setImage,
    closeModal,
}) {
    const classes = useStyles(styles);
    const sharedValue = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'black',
            transform: [
                {
                    translateY: interpolate(
                        sharedValue.value,
                        [0, 1],
                        [500, 0],
                        Extrapolate.CLAMP
                    ),
                },
            ],
            opacity: sharedValue.value,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
        };
    });
    useEffect(() => {
        sharedValue.value = withTiming(1);
    }, []);

    const takeOtherPicture = () => {
        sharedValue.value = withTiming(0, {}, () => {
            runOnJS(setPictureBeenTaken)(false);
        });
    };
    const selectImage = () => {
        setImage(pictureUrl);
        closeModal();
    };
    return (
        <Animated.View style={animatedStyle}>
            <Image
                source={{ uri: pictureUrl.uri }}
                resizeMode="contain"
                style={{ width: '100%', height: '100%' }}
            />
            <View style={classes.pictureTakenOptions}>
                <TouchableOpacity
                    onPress={takeOtherPicture}
                    style={classes.regularButton}
                >
                    <KwivrrIcon name="x" color="white" size={24} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={selectImage}
                    style={classes.regularButton}
                >
                    <KwivrrIcon name="check" color="white" size={24} />
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
}

export default PictureTaken;
