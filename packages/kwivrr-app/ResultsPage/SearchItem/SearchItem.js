import React, { useCallback, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import TextRegular from 'kwivrr-ui/TextRegular/';
import KwivrrImage from 'kwivrr-ui/KwivrrImage';
import styles from './styles';
import { useNavigation } from '@react-navigation/core';
import { HOME } from 'kwivrr-common/data/types/navigation';
import { defaultDateFormat } from 'kwivrr-common/dateFormats';
import imageSourceWithoutCache from 'kwivrr-common/imageSourceWithoutCache';

function SearchItem({ data, idx, eventItem }) {
    const { navigate } = useNavigation();
    const classes = useStyles(styles);

    const info = useMemo(
        () => ({
            title: !eventItem ? data.username : data.eventName,
            subtitle: !eventItem
                ? data.bio
                : data.hostName + ' · ' + data.eventStartDatetime,
            image: !eventItem ? data.avatar : data.eventImage,
        }),
        [data, eventItem]
    );
    const onPress = useCallback(() => {
        if (eventItem) {
            return navigate(HOME.SPLASH, { ...data, event: data });
        }
        navigate(HOME.USER_PROFILE, { ...data, event: data, userId: data.id });
    }, [data, eventItem]);

    if (eventItem) {
        return <Event data={data} eventItem={eventItem} />;
    }
    return <User data={data} eventItem={eventItem} />;
}

function User({ data, eventItem }) {
    const {
        user_id,
        title,
        firstname,
        lastname,
        tagline,
        facebook,
        instagram,
        pinterest,
        blogger,
        linkedin,
        twitter,
        shop_link,
        email_visibility,
        phone_visibility,
        avatar_url: avatarUrl,
        banner_url,
        email,
        phone,
    } = data;

    const { navigate } = useNavigation();
    const classes = useStyles(styles);

    const onPress = useCallback(() => {
        if (eventItem) {
            return navigate(HOME.SPLASH, { ...data, event: data });
        }
        navigate(HOME.USER_PROFILE, {
            ...data,
            event: data,
            userId: data.user_id,
        });
    }, [data, eventItem]);

    return (
        <View style={classes.container}>
            <TouchableOpacity
                style={classes.touchableContainer}
                onPress={onPress}
            >
                <View style={classes.itemImageContainer}>
                    <KwivrrImage
                        source={{ uri: imageSourceWithoutCache(avatarUrl) }}
                        resizeMode="cover"
                        style={classes.itemImage}
                    />
                </View>
                <View style={classes.itemInfo}>
                    <TextRegular size={18} style={classes.itemUsername}>
                        {firstname + '  ' + lastname}
                    </TextRegular>
                    <TextRegular>{tagline}</TextRegular>
                </View>
            </TouchableOpacity>
        </View>
    );
}

function Event({ data, eventItem }) {
    const {
        id,
        name,
        location,
        start_date: startDate,
        end_date: endDate,
        embed_code: embedCode,
        state,
        user_id: userId,
        tenant_id: tenantId,
        live_stream_name: liveStreamName,
        broadcaster,
        livestream_type: liveStreamType,
        shop_url: shopUrl,
        learnmore_url: learnMoreUrl,
        event_type: eventType,
        share_link: shareLink,
        event_image_url: eventImageUrl,
    } = data;

    const { navigate } = useNavigation();
    const classes = useStyles(styles);

    const onPress = useCallback(() => {
        if (eventItem) {
            return navigate(HOME.SPLASH, {
                ...data,
                event: data,
                eventId: data.id,
            });
        }
        navigate(HOME.USER_PROFILE, { ...data, event: data, userId: data.id });
    }, [data, eventItem]);

    return (
        <View style={classes.container}>
            <TouchableOpacity
                style={classes.touchableContainer}
                onPress={onPress}
            >
                <View style={classes.itemImageContainer}>
                    <KwivrrImage
                        source={{ uri: imageSourceWithoutCache(eventImageUrl) }}
                        resizeMode="cover"
                        style={classes.itemImage}
                    />
                </View>
                <View style={classes.itemInfo}>
                    <TextRegular size={18} style={classes.itemUsername}>
                        {name}
                    </TextRegular>
                    <TextRegular>{defaultDateFormat(startDate)}</TextRegular>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default SearchItem;
