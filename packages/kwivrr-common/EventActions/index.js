import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Touchable from 'kwivrr-ui/Touchable';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import useTheme from 'kwivrr-hooks/useTheme';
import { CREATE, STACKS } from '../data/types/navigation';

// pass an event prop to perform actions

function EventActions({
    eventInfo,
    action,
    iconSize = 22,
    iconColor,
    onPress,
    style,
}) {
    const { palette } = useTheme();
    if (!iconColor) {
        iconColor = palette.button.primary;
    }
    const { navigate } = useNavigation();
    const clone = () => {
        navigate(STACKS.CREATE, {
            params: {
                eventInfo,
                cloning: true,
            },
            screen: CREATE.INITIAL,
        });
    };
    const onPressDelete = () => {};
    if (!action) return <></>;

    if (action === 'eventmanager') {
        return (
            <Touchable style={style} onPress={onPress} activeOpacity={0.5}>
                <KwivrrIcon
                    name="user-plus"
                    size={iconSize}
                    color={iconColor}
                />
            </Touchable>
        );
    }

    if (action === 'splashScreen') {
        return (
            <Touchable style={style} onPress={onPress} activeOpacity={0.5}>
                <KwivrrIcon name="eye" size={iconSize} color={iconColor} />
            </Touchable>
        );
    }
    if (action === 'eventmanager') {
        return (
            <Touchable style={style} onPress={onPress} activeOpacity={0.5}>
                <KwivrrIcon
                    name="user-plus"
                    size={iconSize}
                    color={iconColor}
                />
            </Touchable>
        );
    }

    if (action === 'edit') {
        return (
            <Touchable style={style} onPress={onPress} activeOpacity={0.5}>
                <KwivrrIcon name="edit" size={iconSize} color={iconColor} />
            </Touchable>
        );
    }
    if (action === 'share') {
        return (
            <Touchable style={style} onPress={onPress} activeOpacity={0.5}>
                <KwivrrIcon name="share" size={iconSize} color={iconColor} />
            </Touchable>
        );
    }
    if (action === 'customTicket') {
        return (
            <Touchable style={style} onPress={onPress} activeOpacity={0.5}>
                <KwivrrIcon name="tag" size={iconSize} color={iconColor} />
            </Touchable>
        );
    }
    if (action === 'delete') {
        return (
            <Touchable style={style} onPress={onPress} activeOpacity={0.5}>
                <KwivrrIcon name="trash" color="red" size={iconSize} />
            </Touchable>
        );
    }
    if (action === 'clone') {
        return (
            <Touchable
                style={style}
                full
                centered
                onPress={onPress}
                activeOpacity={1}
            >
                <KwivrrIcon name="copy" size={iconSize} color={iconColor} />
            </Touchable>
        );
    }
}

export default EventActions;
