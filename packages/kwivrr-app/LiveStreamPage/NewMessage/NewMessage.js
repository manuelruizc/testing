import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard, Platform, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import InputComponent from 'kwivrr-ui/InputComponent';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import useStyles from 'kwivrr-hooks/useStyles';
import useAnimatedClasses from 'kwivrr-hooks/useAnimatedClasses';
import styles from '../styles';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import useDimensions from 'kwivrr-hooks/useDimensions';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';
import animatedStyles from './animatedStyles';
import usePlatform from 'kwivrr-hooks/usePlatftorm';
import useActions from 'kwivrr-hooks/useActions';
import zEventsApi from '@icentris/kwivrr-sdk';

function NewMessage({
    comments,
    setComments,
    eventId,
    eventRoomMemberId,
    isBanned,
    isBlocked,
}) {
    const input = useRef(null);
    const { screenHeight } = useDimensions();
    const { isAndroid } = usePlatform();
    const bottom = useSharedValue(0);
    const [bottomOffset, setBottomOffset] = useState(0);
    const container = useSharedValue({
        height: null,
        width: null,
    });

    const { containerStyle } = useAnimatedClasses(
        animatedStyles,
        { container, bottom },
        { bottomOffset }
    );
    useEffect(() => {
        const keyboardVisibleListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            (data) => {
                const endHeight = data.endCoordinates.height;
                const offset = endHeight - container.value.height / 1.5;
                const plus = isAndroid ? screenHeight * 0.05 : 0;
                if (offset != bottomOffset) {
                    setBottomOffset(offset + plus);
                }
                bottom.value = withTiming(offset + plus);
            }
        );
        const keyboardHiddenListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            () => {
                bottom.value = withTiming(0);
            }
        );

        return () => {
            keyboardHiddenListener.remove();
            keyboardVisibleListener.remove();
        };
    }, []);

    const classes = useStyles(styles);
    const [newMessage, setNewMessage] = useState('');
    const { userInfo } = useAuthCredentials();
    // if (!userInfo) return <></>;
    const { firstName, lastName, avatar } = userInfo;
    // const sendMessage = () => {
    //     if (!newMessage.length) return;
    //     const newId = comments.length + 1;
    //     const newComment = {
    //         id: newId,
    //         comment: newMessage,
    //         username: firstName + ' ' + lastName,
    //         time: 'now',
    //         avatar,
    //     };
    //     setComments((prev) => [...prev, newComment]);
    //     setNewMessage('');
    //     input.current?.blur();
    // };
    const onLayout = (event) => {
        if (container.value.width) return;
        const { height, width } = event.nativeEvent.layout;
        container.value = { width, height };
    };
    const { onAddEventMessage } = useActions();
    const sendComment = useCallback(() => {
        onAddEventMessage({
            eventId,
            message: newMessage,
            eventRoomMemberId: eventRoomMemberId,
        })
            .then(() => {
                setNewMessage('');
                input.current?.blur();
            })
            .catch((e) => {
                console.log(e);
            });
    }, [onAddEventMessage, newMessage]);

    return (
        <Animated.View onLayout={onLayout} style={containerStyle}>
            <View style={classes.messageInput}>
                <InputComponent
                    autoCorrect={false}
                    ref={input}
                    value={newMessage}
                    onChangeText={(text) => setNewMessage(text)}
                    style={{
                        width: '100%',
                        height: 46,
                        paddingLeft: 24,
                        borderRadius: 10000,
                        paddingRight: 12,
                    }}
                    placeholder="Send Message"
                    placeholderTextColor="rgba(0, 0, 0, 0.6)"
                    inputStyle={{
                        width: '100%',
                        height: 46,
                        color: 'black',
                    }}
                    editable={!isBanned}
                />
            </View>
            <TouchableOpacity
                style={{
                    ...classes.send,
                    opacity: isBanned ? 0.3 : 1,
                }}
                disabled={!newMessage.length}
                onPress={sendComment}
                disabled={isBanned}
            >
                <KwivrrIcon
                    size={26}
                    name="send"
                    color="white"
                    style={{ marginBottom: -2, marginRight: 2 }}
                />
            </TouchableOpacity>
        </Animated.View>
    );
}

NewMessage.propTypes = {
    comments: PropTypes.array,
    setComments: PropTypes.func.isRequired,
};

export default NewMessage;
