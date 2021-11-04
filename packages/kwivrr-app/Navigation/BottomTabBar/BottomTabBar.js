import React, { useCallback, useEffect, useMemo } from 'react';
import { TouchableOpacity, View, Platform } from 'react-native';
import PropTypes from 'prop-types';
import GradientBackgroundRectangular from 'kwivrr-ui/GradientBackgroundRectangular/GradientBackgroundRectangular';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon/KwivrrIcon';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import useDimensions from 'kwivrr-hooks/useDimensions';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import { useDropdowns } from 'kwivrr-common/MiniModalsContext';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';
import useAnimatedClasses from 'kwivrr-hooks/useAnimatedClasses';
import animatedStyles from './animatedStyles';
import BottomTabBarItem from './BottomTabBarItem/';

function BottomTabBar({ state, descriptors, navigation }) {
    const currentRouteName = state.routeNames[state.index];
    const currentRoute = state.routes[state.index];
    const currentScreen = currentRoute.state
        ? currentRoute.state.routeNames
            ? currentRoute.state.routeNames[currentRoute.state.index]
            : null
        : null;
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    const {
        loggedOutRedirect,
        authState,
        resetRedirect,
        redirect,
        userIsLogged,
    } = useAuthCredentials();
    const { isSearchbarActive } = useDropdowns();
    const { screenWidth } = useDimensions();
    const BAR_WIDTH = screenWidth / 4;
    const barAnimated = useSharedValue(0);
    const sharedIndex = useSharedValue(0);
    useEffect(() => {
        'worklet';
        barAnimated.value = isSearchbarActive
            ? withSpring(BAR_WIDTH * 1)
            : withSpring(BAR_WIDTH * state.index);
        sharedIndex.value = isSearchbarActive ? 1 : state.index;
    }, [state.index, isSearchbarActive]);
    useEffect(() => {
        if (userIsLogged && redirect.state) {
            setTimeout(() => {
                navigation.navigate(redirect.to);
                resetRedirect();
            }, 500);
        }
    }, [redirect, authState]);
    const active = useMemo(
        () => !(currentRouteName === 'LiveStreamPage'),
        [currentRouteName]
    );

    const { barStyle } = useAnimatedClasses(
        animatedStyles,
        { barAnimated },
        { active }
    );
    const classes = useStyles(styles);

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }
    if (currentRoute.name === 'LiveStreamPage') return <></>;

    return (
        <View style={classes.container}>
            {state.routes.map((route, index) => (
                <BottomTabBarItem
                    currentRoute={currentRoute}
                    currentRouteName={currentRouteName}
                    currentScreen={currentScreen}
                    index={index}
                    descriptors={descriptors}
                    state={state}
                    navigation={navigation}
                    key={index}
                    route={route}
                />
            ))}
            <Animated.View style={barStyle}>
                <View style={classes.barIndicator} />
            </Animated.View>
        </View>
    );
}

BottomTabBar.propTypes = {
    state: PropTypes.object.isRequired,
    descriptors: PropTypes.object,
    navigation: PropTypes.object.isRequired,
};

export default BottomTabBar;
