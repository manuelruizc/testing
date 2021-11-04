import useStyles from 'kwivrr-hooks/useStyles';
import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import KwivrrIcon from '../KwivrrIcon';
import TextHeader from '../TextHeader';
import styles from './styles';

const ChevronHeader = ({
    style,
    containerStyle = {},
    toggleKey,
    title,
    toggle,
    error,
}) => {
    const classes = useStyles(styles);
    return (
        <TouchableOpacity
            onPress={() => toggle(toggleKey)}
            activeOpacity={0.7}
            style={[classes.toggleHeader, containerStyle]}
        >
            <TextHeader color={!error ? 'black' : 'tomato'} size={16}>
                {title}
            </TextHeader>
            <Animated.View style={style}>
                <KwivrrIcon
                    name="chevron-down"
                    size={24}
                    color={!error ? 'black' : 'tomato'}
                />
            </Animated.View>
        </TouchableOpacity>
    );
};

export default memo(ChevronHeader);
