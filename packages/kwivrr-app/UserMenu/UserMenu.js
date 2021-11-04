import React, { useContext, useEffect, useMemo } from 'react';
import { TouchableOpacity, View, Modal } from 'react-native';
import PropTypes from 'prop-types';
import useStyles from 'kwivrr-hooks/useStyles';
import Animated, {
    Easing,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated';
import styles from './styles';
import TextSubHeader from 'kwivrr-ui/TextSubHeader';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import { useDropdowns } from 'kwivrr-common/MiniModalsContext';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';
import { HOME } from 'kwivrr-common/data/types/navigation';
import headerHeight from 'kwivrr-common/headerHeight';
import usePlatform from 'kwivrr-hooks/usePlatftorm';
import useActions from 'kwivrr-hooks/useActions';

function UserMenu({ navigationRef }) {
    const { isAndroid } = usePlatform();
    const { userInfo } = useAuthCredentials();
    const animationValue = useSharedValue(-400);
    const shadowRadius = useSharedValue(0);
    const backdrop = useSharedValue(1);
    const { unmountMenu, closeMenu, menuState } = useDropdowns();
    const { onLogout } = useActions();
    const classes = useStyles(styles);

    const style = useAnimatedStyle(() => {
        if (isAndroid) {
            return {
                width: '100%',
                height: 220,
                position: 'absolute',
                top: animationValue.value,
                marginTop: headerHeight,
                left: 0,
                paddingVertical: 22,
                backgroundColor: 'white',
                justifyContent: 'space-around',
                alignItems: 'center',
                elevation: 5,
            };
        }
        return {
            width: '100%',
            height: 220,
            position: 'absolute',
            top: animationValue.value,
            marginTop: headerHeight,
            left: 0,
            paddingVertical: 22,
            backgroundColor: 'white',
            justifyContent: 'space-around',
            alignItems: 'center',
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 0.4,
            shadowRadius: shadowRadius.value,
            shadowColor: 'black',
        };
    });
    const backdropStyle = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            opacity: backdrop.value,
        };
    });

    useEffect(() => {
        animationValue.value = withTiming(0, {
            duration: 250,
            easing: Easing.in(Easing.ease),
        });
        shadowRadius.value = withDelay(200, withTiming(15));
        backdrop.value = withTiming(1);
    }, []);

    useEffect(() => {
        if (menuState.close) {
            closeMenu();
        }
    }, [menuState.close]);

    const _closeMenu = () => {
        animationValue.value = withTiming(
            -400,
            { duration: 250, easing: Easing.out(Easing.ease) },
            (isFinished) => {
                runOnJS(unmountMenu)();
            }
        );
        backdrop.value = withTiming(0, { duration: 450 });
    };

    const navigateTo = (screenName) => {
        navigationRef.current?.navigate(screenName);
        closeMenu();
    };

    // const { style, backdropStyle } = useAnimatedClasses(animatedStyles, {
    //     shadowRadius,
    //     animationValue,
    //     backdrop,
    // });

    const logout = () => {
        navigationRef.current?.navigate(HOME.INITIAL);
        setTimeout(() => {
            onLogout();
        }, 1000);
        closeMenu();
    };
    const close = () => {
        _closeMenu();
        backdrop.value = withTiming(0);
    };
    const onRequestClose = () => {
        close();
    };

    const goToProfile = () => {
        closeMenu();
        return navigationRef.current?.navigate(HOME.USER_PROFILE, {
            avatar: userInfo.avatar,
            name: userInfo.fullName,
            userId: userInfo.id,
        });
    };

    return (
        <Modal
            presentationStyle="overFullScreen"
            transparent={true}
            visible={true}
            onRequestClose={onRequestClose}
        >
            <Animated.View style={backdropStyle}>
                <TouchableOpacity
                    onPress={close}
                    style={classes.backdropTouchable}
                >
                    <View style={classes.backdropTouchable} />
                </TouchableOpacity>
            </Animated.View>
            <Animated.View style={style}>
                <View style={classes.headerContainer}>
                    <TouchableOpacity onPress={goToProfile}>
                        <TextSubHeader size={21}>My Profile</TextSubHeader>
                    </TouchableOpacity>
                    <View style={classes.closeMenuContainer}>
                        <TouchableOpacity onPress={_closeMenu}>
                            <KwivrrIcon name="x" size={24} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity onPress={() => navigateTo('AccountSettings')}>
                    <TextSubHeader size={21}>Account</TextSubHeader>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigateTo('NotificationsSettings')}
                >
                    <TextSubHeader size={21}>Notifications</TextSubHeader>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigateTo('AboutSettings')}>
                    <TextSubHeader size={21}>About</TextSubHeader>
                </TouchableOpacity>
                <TouchableOpacity onPress={logout}>
                    <TextSubHeader size={21}>Logout</TextSubHeader>
                </TouchableOpacity>
            </Animated.View>
        </Modal>
    );
}

UserMenu.propTypes = {
    navigationRef: PropTypes.shape({
        current: PropTypes.any,
    }),
};

export default UserMenu;
