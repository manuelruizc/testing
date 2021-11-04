import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import useAnimatedClasses from 'kwivrr-hooks/useAnimatedClasses';
import animatedStyles from './animatedStyles';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import Animated from 'react-native-reanimated';
import styles from './styles';
import useDimensions from 'kwivrr-hooks/useDimensions';

function Header({ selector, scrollRef }) {
    const { screenWidth } = useDimensions();
    const classes = useStyles(styles);

    const onPress = (index) => {
        scrollRef.current?.scrollTo({
            x: screenWidth * index,
            y: 0,
            animated: true,
        });
    };

    const { bottomBarStyle } = useAnimatedClasses(animatedStyles, {
        selector,
    });

    return (
        <View style={classes.header}>
            <TouchableOpacity
                onPress={() => onPress(0)}
                style={classes.touchable}
            >
                <KwivrrIcon name="calendar" size={26} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => onPress(1)}
                style={classes.touchable}
            >
                <KwivrrIcon name="square" size={26} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => onPress(2)}
                style={classes.touchable}
            >
                <KwivrrIcon name="list" size={26} />
            </TouchableOpacity>
            <Animated.View style={bottomBarStyle}>
                <View style={classes.selector} />
            </Animated.View>
        </View>
    );
}

Header.propTypes = {};

export default Header;
