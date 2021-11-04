import React, { useCallback, useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';
import { useDropdowns } from 'kwivrr-common/MiniModalsContext';
import KwivrrGradient from 'kwivrr-ui/KwivrrGradient';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import usePlatform from 'kwivrr-hooks/usePlatftorm';
import { STACKS } from 'kwivrr-common/data/types/navigation';

function BottomTabBarItem({
    route,
    navigation,
    state,
    descriptors,
    index,
    currentRouteName,
    currentScreen,
}) {
    const { isAndroid } = usePlatform();
    const { loggedOutRedirect, userInfo } = useAuthCredentials();
    const { closeSearchbar, openSearchbar, isSearchbarActive } = useDropdowns();
    const { options } = descriptors[route.key];
    const label =
        options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

    const iconName = useCallback((screen) => {
        const names = {
            [STACKS.HOME]: 'home',
            [STACKS.SEARCH]: 'search',
            [STACKS.CREATE]: 'plus',
            [STACKS.MANAGEMENT]: 'calendar',
        };
        return names[screen];
    }, []);

    const isFocused = state.index === index;

    const onPress = () => {
        if (
            !userInfo &&
            (route.name === STACKS.CREATE || route.name === STACKS.MANAGEMENT)
        ) {
            return loggedOutRedirect(route.name);
        }
        const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
        });
        if (index === 1) {
            // if the nav button pressed is search
            if (
                (currentRouteName === 'Search' && !currentScreen) ||
                currentScreen === 'SearchStackScreen'
            ) {
                return; // do not active searchbar when in Results Page Screen
            }
            return isSearchbarActive ? closeSearchbar() : openSearchbar();
        } else {
            if (isSearchbarActive) {
                closeSearchbar();
            }
        }

        if (!isFocused && !event.defaultPrevented) {
            if (route.name === 'Home') {
                // navigation.navigate('HomeStackScreen');
                return navigation.navigate(STACKS.HOME);
            }
            if (route.name === STACKS.CREATE) {
                return navigation.navigate(STACKS.CREATE, {
                    params: {
                        cloning: false,
                    },
                });
            }
            navigation.navigate(route.name);
        }
    };

    const onLongPress = () => {
        navigation.emit({
            type: 'tabLongPress',
            target: route.key,
        });
    };

    const classes = useStyles(styles);
    const labelSize = useMemo(() => {
        if (isAndroid && label === 'Upload') {
            return 24;
        }
        if (isAndroid && !(label === 'Upload')) {
            return 27;
        }
        if (label === 'Upload') {
            return 24;
        }
        return 30;
    }, [label, isAndroid]);
    if (route.name === 'LiveStreamPage')
        return <React.Fragment key={label}></React.Fragment>;

    return (
        <View style={classes.buttonContainer} key={label}>
            <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={classes.button}
            >
                <View style={classes.bottomBarItem}>
                    {label === 'Upload' && (
                        <KwivrrGradient style={classes.gradient} />
                    )}
                    <KwivrrIcon
                        color={label === 'Upload' ? 'white' : 'black'}
                        size={labelSize}
                        name={iconName(label)}
                        style={classes.icon}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default BottomTabBarItem;
