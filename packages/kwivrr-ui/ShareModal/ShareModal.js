import imageSourceWithoutCache from 'kwivrr-common/imageSourceWithoutCache';
import usePlatform from 'kwivrr-hooks/usePlatftorm';
import useStyles from 'kwivrr-hooks/useStyles';
import React, { useEffect } from 'react';
import {
    Image,
    Linking,
    Platform,
    Share,
    TouchableOpacity,
    View,
} from 'react-native';
import Avatar from '../Avatar';
import KwivrrImage from '../KwivrrImage';
import KwivrrModal from '../KwivrrModal';
import TextHeader from '../TextHeader';
import TextRegular from '../TextRegular';
import TextSubHeader from '../TextSubHeader';
import styles from './styles';

function ShareModal({
    closeModal,
    eventImage,
    eventName,
    eventStartDatetime,
    eventId,
    url = 'https://kkwbeauty.com/collections/body-makeup-collection',
    type,
    shareUrl = '',
}) {
    const classes = useStyles(styles);
    return (
        <KwivrrModal
            close={closeModal}
            title={type === 'event' ? 'Share Event' : 'Share User Profile'}
            usingScrollView={false}
            // modalStyle={
            //     eventImage
            //         ? { ...classes.modal }
            //         : { ...classes.modalWithoutImage }
            // }
            // modalInnerStyle={{ ...classes.modalInner }}
            titleStyle={{ marginBottom: 0 }}
            absoluteCloseButton
        >
            {type === 'event' ? (
                <ShareContent
                    eventUrl={shareUrl}
                    eventImage={eventImage}
                    eventName={eventName}
                    eventStartDatetime={eventStartDatetime}
                />
            ) : (
                <ShareContentUser
                    shareUrl={shareUrl}
                    userImage={eventImage}
                    userName={eventName}
                />
            )}
        </KwivrrModal>
    );
}
const _eventUrl = 'https://www.youtube.com/watch?v=X9ou9F3CSjc';
function ShareContent({
    closeModal,
    eventImage,
    eventName,
    eventStartDatetime,
    eventUrl = 'https://kkwbeauty.com/collections/body-makeup-collection',
}) {
    const { isAndroid } = usePlatform();
    const ___moreOptions = async () => {
        // Sharing.shareAsync({url: })
    };
    const moreOptions = async () => {
        try {
            const result = await Share.share({
                // message:
                //     'Watch this event with Kwivrr | ' +
                //     eventName +
                //     ' ' +
                //     eventUrl,
                url: eventUrl,
                title:
                    'Watch this event with Kwivrr | ' +
                    eventName +
                    ' ' +
                    eventUrl,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const share = async (appName) => {
        let canOpen;
        let url;
        switch (appName) {
            case 'sms':
                url = `sms:${
                    Platform.OS === 'android' ? '?' : '&'
                }body=${encodeURIComponent(eventUrl)}`;
                canOpen = await Linking.canOpenURL(url);
                Linking.openURL(url);
                break;
            case 'whatsapp':
                url = 'whatsapp://send?text=' + eventUrl;
                canOpen = await Linking.canOpenURL(url);
                Linking.openURL(url);
                break;
            case 'messenger':
                url = 'fb-messenger://share?link=' + eventUrl;
                canOpen = await Linking.canOpenURL(url);
                Linking.openURL(url);
                break;
            default:
                break;
        }
    };
    const classes = useStyles(styles);

    return (
        <View style={classes.modalContainer}>
            <View style={classes.topInfoContainer}>
                {eventImage && (
                    <KwivrrImage
                        source={{ uri: imageSourceWithoutCache(eventImage) }}
                        resizeMode="cover"
                        style={classes.image}
                        includingKwivrrBackground
                    />
                )}
                <TextHeader
                    size={isAndroid ? 18 : 14}
                    style={classes.eventName}
                >
                    {eventName}
                </TextHeader>
                <TextSubHeader size={isAndroid ? 16 : 14}>
                    {eventStartDatetime}
                </TextSubHeader>
            </View>
            <View style={classes.socialContainer}>
                <TouchableOpacity
                    onPress={() => share('sms')}
                    activeOpacity={0.6}
                >
                    <Image
                        source={{
                            uri: isAndroid
                                ? 'https://play-lh.googleusercontent.com/OY4rxeNTPaHwyOTZ-RUooqJvPnO5QUYmQcw0dhD90Mu6UWItOSZfQv7ks_FscbBow0M'
                                : 'https://images.macrumors.com/t/xzhWbTHDTsoOpWzQKqM2-TTdHuY=/400x0/filters:quality(90)/article-new/2020/07/messagesicon-200x200.png?lossy',
                        }}
                        style={classes.socialIcon}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => share('whatsapp')}
                    activeOpacity={0.6}
                >
                    <Image
                        source={{
                            uri: 'https://image.flaticon.com/icons/png/512/124/124034.png',
                        }}
                        style={classes.socialIcon}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => share('messenger')}
                    activeOpacity={0.6}
                >
                    <Image
                        source={{
                            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/1200px-Facebook_Messenger_logo_2020.svg.png',
                        }}
                        style={classes.socialIcon}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={classes.moreOptions}
                onPress={moreOptions}
                activeOpacity={0.6}
            >
                <TextRegular color="#3652A2" size={16}>
                    More options
                </TextRegular>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal} activeOpacity={0.6}>
                <TextRegular>Cancel</TextRegular>
            </TouchableOpacity>
        </View>
    );
}

function ShareContentUser({
    closeModal,
    userImage,
    userName,
    shareUrl = 'https://kkwbeauty.com/collections/body-makeup-collection',
}) {
    const { isAndroid } = usePlatform();
    const ___moreOptions = async () => {
        // Sharing.shareAsync({url: })
    };
    const moreOptions = async () => {
        try {
            const result = await Share.share({
                // message:
                //     'Watch this event with Kwivrr | ' +
                //     eventName +
                //     ' ' +
                //     eventUrl,
                url: shareUrl,
                title:
                    'Watch this event with Kwivrr | ' +
                    userName +
                    ' ' +
                    shareUrl,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const share = async (appName) => {
        let canOpen;
        let url;
        switch (appName) {
            case 'sms':
                url = `sms:${
                    Platform.OS === 'android' ? '?' : '&'
                }body=${encodeURIComponent(shareUrl)}`;
                canOpen = await Linking.canOpenURL(url);
                Linking.openURL(url);
                break;
            case 'whatsapp':
                url = 'whatsapp://send?text=' + shareUrl;
                canOpen = await Linking.canOpenURL(url);
                Linking.openURL(url);
                break;
            case 'messenger':
                url = 'fb-messenger://share?link=' + shareUrl;
                canOpen = await Linking.canOpenURL(url);
                Linking.openURL(url);
                break;
            default:
                break;
        }
    };
    const classes = useStyles(styles);

    return (
        <View style={classes.modalContainer}>
            <View style={classes.topInfoContainer}>
                {userImage && (
                    <Avatar
                        source={{ uri: imageSourceWithoutCache(userImage) }}
                        resizeMode="cover"
                        style={classes.image}
                        size={72}
                    />
                )}
                <TextHeader
                    size={isAndroid ? 18 : 14}
                    style={classes.eventName}
                >
                    {userName}
                </TextHeader>
            </View>
            <View style={classes.socialContainer}>
                <TouchableOpacity
                    onPress={() => share('sms')}
                    activeOpacity={0.6}
                >
                    <Image
                        source={{
                            uri: isAndroid
                                ? 'https://play-lh.googleusercontent.com/OY4rxeNTPaHwyOTZ-RUooqJvPnO5QUYmQcw0dhD90Mu6UWItOSZfQv7ks_FscbBow0M'
                                : 'https://images.macrumors.com/t/xzhWbTHDTsoOpWzQKqM2-TTdHuY=/400x0/filters:quality(90)/article-new/2020/07/messagesicon-200x200.png?lossy',
                        }}
                        style={classes.socialIcon}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => share('whatsapp')}
                    activeOpacity={0.6}
                >
                    <Image
                        source={{
                            uri: 'https://image.flaticon.com/icons/png/512/124/124034.png',
                        }}
                        style={classes.socialIcon}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => share('messenger')}
                    activeOpacity={0.6}
                >
                    <Image
                        source={{
                            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/1200px-Facebook_Messenger_logo_2020.svg.png',
                        }}
                        style={classes.socialIcon}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={classes.moreOptions}
                onPress={moreOptions}
                activeOpacity={0.6}
            >
                <TextRegular color="#3652A2" size={16}>
                    More options
                </TextRegular>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal} activeOpacity={0.6}>
                <TextRegular>Cancel</TextRegular>
            </TouchableOpacity>
        </View>
    );
}

export default ShareModal;
