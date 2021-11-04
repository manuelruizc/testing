import React, { useEffect, useRef } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import useStyles from 'kwivrr-hooks/useStyles';
import Animated, {
    Easing,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import styles from './styles';
import { useDropdowns } from 'kwivrr-common/MiniModalsContext';
import Searchbar from 'kwivrr-ui/Searchbar';
import useSearch from 'kwivrr-hooks/useSearch';
import { SEARCH, STACKS } from 'kwivrr-common/data/types/navigation';
import headerHeight from 'kwivrr-common/headerHeight';

function SearchBar({ navigationRef }) {
    const { searchTerm, setSearchTerm } = useSearch();
    const inputSearchRef = useRef(null);
    const animationValue = useSharedValue(-400);
    const backdrop = useSharedValue(0);
    const { unmountSearchbar, closeSearchbar, searchbarState } = useDropdowns();
    const classes = useStyles(styles);
    useEffect(() => {
        onMount();
    }, []);

    const onMount = () => {
        'worklet';
        animationValue.value = withTiming(0, {
            duration: 450,
            easing: Easing.in(Easing.ease),
        });
        runOnJS(inputSearchRef.current?.focus)();
        backdrop.value = withTiming(1);
    };

    const closeMenu = () => {
        'worklet';
        animationValue.value = withTiming(
            -400,
            { duration: 450, easing: Easing.out(Easing.ease) },
            () => {
                runOnJS(unmountSearchbar)();
            }
        );
    };

    const search = (_searchTerm) => {
        // navigationRef.current?.navigate('Search');
        navigationRef.current?.navigate(STACKS.SEARCH, {
            screen: SEARCH.SEARCH_RESULTS,
        });
    };

    const navigateTo = (screenName) => {
        navigationRef.current?.navigate(screenName);
        closeSearchbar();
    };

    useEffect(() => {
        if (searchbarState.close) {
            closeMenu();
        }
    }, [searchbarState.close]);

    // const { style, backdropStyle } = useAnimatedClasses(animatedStyles, {
    //     animationValue,
    //     backdrop,
    // });
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
    const style = useAnimatedStyle(() => {
        return {
            width: '100%',
            height: 68,
            position: 'absolute',
            top: animationValue.value,
            marginTop: headerHeight,
            left: 0,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(0, 0, 0, 0.2)',
        };
    });
    const close = () => {
        closeSearchbar();
        backdrop.value = withTiming(0);
    };
    const onRequestClose = () => {
        close();
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
                <Searchbar
                    onChangeText={(text) => setSearchTerm(text)}
                    value={searchTerm}
                    onSubmitEditing={({ nativeEvent: { text } }) =>
                        search(text)
                    }
                    ref={inputSearchRef}
                />
            </Animated.View>
        </Modal>
    );
}

SearchBar.propTypes = {
    navigationRef: PropTypes.shape({
        current: PropTypes.any,
    }),
};

export default SearchBar;
