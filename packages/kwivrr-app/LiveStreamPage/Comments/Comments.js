import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Platform, View } from 'react-native';
import PropTypes from 'prop-types';
import Item from '../Item';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import AuthButton from 'kwivrr-ui/AuthButton';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

function Comments({ comments, eventId, setComments }) {
    const ref = useRef();
    const classes = useStyles(styles);
    const [isAtBottom, setIsAtBottom] = useState(false);
    const [alertNewMessage, setAlertNewMessage] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            ref.current?.scrollToEnd();
        }, 500);
    }, []);
    const isCloseToBottom = ({
        layoutMeasurement,
        contentOffset,
        contentSize,
    }) => {
        const paddingToBottom = 30;
        return (
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom
        );
    };
    const renderItem = ({ item }) => <Item item={item} />;
    const memoizedItem = useMemo(() => renderItem, []);
    const onScroll = ({ nativeEvent }) => {
        const isBottom = isCloseToBottom(nativeEvent);
        if (isBottom) {
            setIsAtBottom(true);
            setAlertNewMessage(false);
        }
        if (!isBottom && isAtBottom) {
            setIsAtBottom(false);
        }
    };
    const onNewMessagePress = () => {
        ref.current?.scrollToEnd();
        setAlertNewMessage(false);
        setIsAtBottom(true);
    };

    return (
        <View style={classes.commentsFlatListContainer}>
            <FlatList
                onScroll={onScroll}
                onContentSizeChange={() => {
                    if (isAtBottom) {
                        ref.current?.scrollToEnd();
                        ref.current?.scrollToEnd();
                        setAlertNewMessage(false);
                    } else {
                        setAlertNewMessage(true);
                    }
                }}
                style={classes.flatList}
                data={comments}
                renderItem={memoizedItem}
                keyExtractor={(item) => {
                    if (item.id) return String(item.id);
                }}
                ref={ref}
                showsVerticalScrollIndicator={false}
            />
            {alertNewMessage && (
                <NewMessageButton onNewMessagePress={onNewMessagePress} />
            )}
        </View>
    );
}

function NewMessageButton({ onNewMessagePress }) {
    const anim = useSharedValue(0);

    useEffect(() => {
        anim.value = withTiming(1);
    }, []);

    const classes = useStyles(styles);

    const style = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            paddingVertical: 18,
            alignItems: 'center',
            justifyContent: 'center',
            transform: [
                {
                    scale: anim.value,
                },
            ],
        };
    });
    return (
        <Animated.View style={style}>
            <AuthButton
                onPress={onNewMessagePress}
                gradientBackground
                buttonStyle={{ ...classes.moreMessagesButton }}
                style={{ ...classes.moreMessages }}
                uppercase={false}
                textFontSize={16}
                textColor="white"
            >
                New Messages
            </AuthButton>
        </Animated.View>
    );
}

Comments.propTypes = {
    comments: PropTypes.array,
};

export default Comments;
