import React, { useState } from 'react';
import { View } from 'react-native';
import Animated, { runOnJS } from 'react-native-reanimated';
import useAnimatedClasses from 'kwivrr-hooks/useAnimatedClasses';
import animatedStyles from './animatedStyles';

function Accordion({ active, children }) {
    const [layoutDone, setLayoutDone] = useState(false);
    const [totalHeight, setTotalHeight] = useState(0);
    const { accordionStyle } = useAnimatedClasses(
        animatedStyles,
        { active },
        { totalHeight, layoutDone }
    );
    const onLayout = (event) => {
        if (layoutDone) return;
        const { height: _height } = event.nativeEvent.layout;
        setLayoutDone(true);
        runOnJS(setTotalHeight)(_height);
    };
    return (
        <Animated.View onLayout={onLayout} style={accordionStyle}>
            {children}
        </Animated.View>
    );
}

export default Accordion;
