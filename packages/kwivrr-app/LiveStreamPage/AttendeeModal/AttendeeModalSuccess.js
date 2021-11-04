import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    View,
    TouchableOpacity,
} from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import TextRegular from 'kwivrr-ui/TextRegular';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import KwivrrImage from 'kwivrr-ui/KwivrrImage';
import useActions from 'kwivrr-hooks/useActions';
import { useNavigation } from '@react-navigation/core';
import imageSourceWithoutCache from 'kwivrr-common/imageSourceWithoutCache';

function AttendeeModalSuccess({
    apiAttendees,
    eventId,
    listSummary,
    criteriaSummary,
    eventRoomMemberId: _eventRoomMemberId,
}) {
    const { navigate } = useNavigation();
    const [blockButtonActive, setBlockButtonActive] = useState({});
    const [muteButtonActive, setMuteButtonActive] = useState({});
    const [attendees, setAttendees] = useState(apiAttendees);

    const {
        onBanEventAttendee,
        onBlockEventAttendee,
        onMuteEventAttendee,
        onUnbanEventAttendee,
        onUnblockEventAttendee,
        onUnmuteEventAttendee,
    } = useActions();

    const onBlockPress = async (isBlocked = false, id, index) => {
        try {
            setBlockButtonActive((prev) => ({
                ...prev,
                [id]: true,
            }));
            const payload = { eventId, attendeeId: id };
            if (isBlocked) {
                await onUnblockEventAttendee(payload);
            } else {
                await onBlockEventAttendee(payload);
            }
            setAttendees((prevAttendees) => {
                prevAttendees[index].isBlocked = isBlocked ? false : true;
                return [...prevAttendees];
            });
            setBlockButtonActive((prev) => ({
                ...prev,
                [id]: false,
            }));
        } catch (e) {
            alert('error');
            setBlockButtonActive((prev) => ({
                ...prev,
                [id]: false,
            }));
        }
    };

    const onMutedPress = async (isBanned = false, id, index) => {
        try {
            setMuteButtonActive((prev) => ({
                ...prev,
                [id]: true,
            }));
            const payload = { eventId, attendeeId: id };
            if (isBanned) {
                await onUnbanEventAttendee(payload);
            } else {
                await onBanEventAttendee(payload);
            }
            setAttendees((prevAttendees) => {
                prevAttendees[index].isBanned = isBanned ? false : true;
                return [...prevAttendees];
            });
            setMuteButtonActive((prev) => ({
                ...prev,
                [id]: false,
            }));
        } catch (e) {
            console.log('error', e);
            setMuteButtonActive((prev) => ({
                ...prev,
                [id]: false,
            }));
        }
    };

    const classes = useStyles(styles);

    return (
        <View style={classes.container}>
            <FlatList
                style={{ flex: 1 }}
                keyExtractor={({ id }) => String(id)}
                data={attendees}
                renderItem={({ item, index }) => {
                    const {
                        id,
                        isMuted,
                        status,
                        title,
                        eventRoomMemberId,
                        viewerName,
                        avatarUrl,
                        isBlocked,
                        isBanned,
                    } = item;

                    return (
                        <View style={classes.userContainer}>
                            <View style={classes.userInfoContainer}>
                                <View style={classes.avatarContainer}>
                                    <KwivrrImage
                                        source={{
                                            uri: avatarUrl,
                                        }}
                                        style={classes.avatar}
                                        resizeMode="cover"
                                    />
                                </View>
                                <TextRegular
                                    style={{ width: '60%', maxWidth: '60%' }}
                                    numberOfLines={1}
                                    size={16}
                                >
                                    {/* {isBlocked ? 'isbanned' : 'wow'} */}
                                    {viewerName}
                                </TextRegular>
                            </View>
                            {_eventRoomMemberId !== eventRoomMemberId && (
                                <View style={classes.actionsContainer}>
                                    {muteButtonActive[eventRoomMemberId] ? (
                                        <ActivityIndicator
                                            style={{ marginRight: 12 }}
                                            size="small"
                                            color="tomato"
                                        />
                                    ) : (
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            style={{ marginRight: 12 }}
                                            onPress={() =>
                                                onMutedPress(
                                                    isBanned,
                                                    eventRoomMemberId,
                                                    index
                                                )
                                            }
                                            disabled={
                                                muteButtonActive[
                                                    eventRoomMemberId
                                                ]
                                            }
                                        >
                                            <KwivrrIcon
                                                name={
                                                    isBanned
                                                        ? 'volume-x'
                                                        : 'volume-2'
                                                }
                                                color={
                                                    isBanned
                                                        ? 'tomato'
                                                        : '#666444'
                                                }
                                            />
                                        </TouchableOpacity>
                                    )}
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={() =>
                                            onBlockPress(
                                                isBlocked,
                                                eventRoomMemberId,
                                                index
                                            )
                                        }
                                        disabled={
                                            blockButtonActive[eventRoomMemberId]
                                        }
                                    >
                                        <KwivrrIcon
                                            name="slash"
                                            color={
                                                isBlocked ? 'tomato' : '#666444'
                                            }
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    );
                }}
            />
            {/* {attendees.map((attendee, index) => {
                console.log(attendee);
                
            })} */}
        </View>
    );
}

export default AttendeeModalSuccess;
