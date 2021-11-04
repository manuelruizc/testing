import React, { useEffect, useMemo, useState } from 'react';
import {
    View,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
    Alert,
} from 'react-native';
import faker from 'faker';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import KwivrrModal from 'kwivrr-ui/KwivrrModal';
import LiveBug from 'kwivrr-ui/LiveBug/LiveBug';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import TextRegular from 'kwivrr-ui/TextRegular';
import Comments from './Comments';
import NewMessage from './NewMessage';
import { WebView } from 'react-native-webview';
import * as ScreenOrientation from 'expo-screen-orientation';
import useDimensions from 'kwivrr-hooks/useDimensions';
import { useIsFocused } from '@react-navigation/native';
import { useShareModal } from 'kwivrr-hooks/useShareModal';
import usePlatform from 'kwivrr-hooks/usePlatftorm';
import { STACKS } from 'kwivrr-common/data/types/navigation';
import useTheme from 'kwivrr-hooks/useTheme';
import * as WebBrowser from 'expo-web-browser';
import kwivrrApi from 'kwivrr-common/sdk';
import vimeoParser from 'kwivrr-common/vimeoParser';
import useActions from 'kwivrr-hooks/useActions';
import useActionCable from 'kwivrr-hooks/useActionCable';
import { defaultDateFormat } from 'kwivrr-common/dateFormats';
import AttendeeModal from './AttendeeModal';
import { useNavigation } from '@react-navigation/native';
import VideoPlayer from './VideoPlayer';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';

const { width, height } = Dimensions.get('window');

const STATUS = ['BLOCK_USER', 'UNBLOCK_USER', 'BAN_USER', 'UNBAN_USER'];

// const _url =
//     'https://www.youtube.com/embed/va-YqajM0mo?autoplay=1&playsinline=1';
const _url =
    'https://player.vimeo.com/video/582593560?title=0&playsinline=1&autoplay=1&controls=0';

function randomEvent() {
    const boolean = faker.datatype.boolean();
    return boolean ? 'zoom' : 'video';
}

function getVideoSource(embedCode, provider) {
    provider = provider.toLowerCase();
    if (
        provider === 'zoom' ||
        provider === 'resi' ||
        provider === 'red5' ||
        provider === 'kwivrr'
    )
        return '';
    const textSplitted = embedCode.split(' ');
    const src_ = textSplitted.find((text) => text.startsWith('src'));
    const source = src_.split('"')[1];
    if (provider === 'youtube') {
        return source;
    }
    if (provider === 'vimeo') {
        let id = vimeoParser(source);
        const a = `https://player.vimeo.com/video/${id}?title=0&playsinline=1&autoplay=1`;
        // const b = `https://player.vimeo.com/video/${613_358_842}?title=0&playsinline=1&autoplay=1`;
        return a;
    }
}

function LiveStreamPage({ route, event, eventId }) {
    const { userInfo } = useAuthCredentials();
    const navigation = useNavigation();
    const [modal, setModal] = useState(false);
    const [eventType, setEventType] = useState(null);
    const { setParams, navigate, setOptions } = navigation;
    const { openModal } = useShareModal();
    const [url, setUrl] = useState(null);
    const classes = useStyles(styles);
    const [orientation, setOrientation] = useState(0);
    const [comms, setComms] = useState([]);
    const [viewers, setViewers] = useState(1);
    const { version, OS, isAndroid } = usePlatform();
    const { palette } = useTheme();

    const {
        shopUrl,
        eventRoomMemberId,
        streamType,
        streamEmbed,
        streamUrl,
        eventImageUrl,
        title,
        startDate,
        isHost,
        hostId,
        isBanned: _isBanned,
        isBlocked: _isBlocked,
        startUrl,
        joinUrl,
    } = event;

    const [isBanned, setIsBanned] = useState(_isBanned);
    const [isBlocked, setIsBlocked] = useState(_isBlocked);

    const isUserHosting = useMemo(() => {
        return hostId === userInfo?.id;
    }, [hostId, userInfo]);

    const setInitialScreen = async () => {
        await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
        );
        await ScreenOrientation.unlockAsync();
    };
    const [interval, setIntervalState] = useState(null);

    useEffect(() => {
        if (route.params.url) {
            const videoId = route.params.url.slice(-11);
            const _url =
                'https://www.youtube.com/embed/' +
                videoId +
                '?playsinline=1&autoplay=1';
            return setUrl(_url);
        }
        setUrl(_url);
    }, [route.params]);

    const setVideoSource = () => {};

    const getCommentsOnMount = async () => {
        try {
            const response = await kwivrrApi.getEventMessages({ eventId });
            const { entries } = response;
            setComms([...entries]);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        // setTimeout(() => {
        //     setComms(DATA);
        // }, 1200);
        ScreenOrientation.getOrientationAsync().then((value) => {
            setOrientation(value);
        });

        const subscription = ScreenOrientation.addOrientationChangeListener(
            (event) => {
                setOrientation(event.orientationInfo.orientation);
            }
        );
        setVideoSource();
        getLocationAsync();

        return () => {
            goBackToPortrait();
            clearInterval(interval);
            subscription.remove();
        };
    }, []);

    const goBackToPortrait = async () => {
        await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.PORTRAIT
        );
    };

    async function getLocationAsync() {}

    const isLandscape = useMemo(() => {
        return (
            orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
            orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
        );
    }, [orientation]);

    const openStore = async () => {
        try {
            await WebBrowser.openBrowserAsync(shopUrl);
        } catch {
            Alert.alert('Web Browser Error', "Couldn't open the url");
        }
    };

    const openZommm = async () => {
        let result = await WebBrowser.openBrowserAsync(
            'https://www.manuelruizc.com/zoomtest'
        );
        setResult(result);
        // let result = await WebBrowser.openBrowserAsync('https://expo.dev');
        setResult(result);
    };

    const openShareModal = () => {
        openModal({
            eventImage: eventImageUrl,
            eventName: title,
            eventStartDatetime: defaultDateFormat(startDate),
            url: 'https://www.youtube.com/google',
            shareUrl: event.shareUrl,
            eventId,
        });
    };

    const goToFullScreen = async () => {
        setOptions({ headerShown: false });
        await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
        );
        // await ScreenOrientation.unlockAsync();
    };

    const getEventAttendeeCountOnMount = async () => {
        try {
            const currentViewers = await kwivrrApi.getEventAttendeeCount({
                eventId,
            });
            setViewers(currentViewers < viewers ? viewers : currentViewers);
        } catch (e) {
            console.error(e);
        }
    };

    const { screenWidth, screenHeight } = useDimensions();
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            getCommentsOnMount();
            getEventAttendeeCountOnMount();
            setEventType(randomEvent());
        }
    }, [isFocused]);

    const videoSource = useMemo(() => {
        return getVideoSource(streamEmbed, streamType);
    }, [streamType, streamEmbed]);

    const isYoutube = useMemo(() => {
        const youtubeRegex = new RegExp(
            '^(https?://)?(www.)?(youtube.com|youtu.?be)/.+$'
        );
        if (youtubeRegex.test(url)) {
            return true;
        }
        return false;
    }, [url]);

    // action cable
    const { onNormalizeEventMessage } = useActions();
    // TODO: Check streamming to the right event not all of them
    const channelParams = {
        channel: 'Api::V1::RoomChannel',
        // id: id,
        event_id: eventId,
        event_room_member_id: eventRoomMemberId,
    };
    const channelHandlers = {
        received(data) {
            if (data.type === 'POST_TO_CHAT') {
                if (data.message) {
                    const normalizedMessage = onNormalizeEventMessage(
                        data.message
                    );
                    setComms((prevComments) => {
                        prevComments.push(normalizedMessage);
                        return [...prevComments];
                    });
                }
            }
            if (STATUS.includes(data.type)) {
                // alert(eventRoomMemberId);
                // TODO: Move/Solidy these with STATUS in the query
                if (
                    Number(eventRoomMemberId) ===
                    Number(data.event_room_member.data.id)
                ) {
                    if (data.type === 'BLOCK_USER') {
                        setIsBlocked(true);
                    }
                    if (data.type === 'UNBLOCK_USER') {
                        setIsBlocked(false);
                    }
                    if (data.type === 'BAN_USER') {
                        setIsBanned(true);
                    }
                    if (data.type === 'UNBAN_USER') {
                        setIsBanned(false);
                    }
                }
                // receiveEventAttendeeStatus({
                //     eventId,
                //     type: data.type,
                //     eventRoomMember: data.event_room_member,
                // });
            }
        },
    };

    useEffect(() => {
        if (isBlocked) {
            navigation.goBack();
        }
    }, [isBanned, isBlocked, navigate]);

    useActionCable(channelParams, channelHandlers);

    const includesShopUrl = useMemo(() => {
        if (!shopUrl) return false;
        if (typeof shopUrl === 'string') {
            if (shopUrl.length > 0) {
                return true;
            }
        }
        return false;
    }, [shopUrl]);

    const ViewersButton = isUserHosting ? TouchableOpacity : View;

    // this is important do not remove
    if (!isFocused || !eventType) {
        return <></>;
    }

    return (
        <React.Fragment>
            <SafeAreaView style={classes.container}>
                <View
                    style={
                        // isLandscape
                        //     ? { width: screenWidth, height: screenHeight }
                        // :
                        { width: '100%' } // clean this later
                    }
                >
                    {!isLandscape && (
                        <View style={classes.viewerStatusContainer}>
                            <LiveBug
                                fontSize={isAndroid ? 14 : 16}
                                absolute={false}
                                style={{ ...classes.liveBug }}
                            />

                            <ViewersButton
                                activeOpacity={0.8}
                                onPress={() => setModal(true)}
                            >
                                <View style={classes.viewersContainer}>
                                    <KwivrrIcon
                                        size={isAndroid ? 20 : 14}
                                        name="eye"
                                        color="white"
                                    />
                                    <TextRegular
                                        style={classes.viewerCount}
                                        color="white"
                                        size={14}
                                    >
                                        {viewers}
                                    </TextRegular>
                                </View>
                            </ViewersButton>

                            <TouchableOpacity
                                onPress={() => {
                                    navigate(STACKS.HOME);
                                }}
                                style={classes.closeButton}
                            >
                                <KwivrrIcon name="x" color="white" />
                            </TouchableOpacity>
                        </View>
                    )}

                    <View style={{ height: width * 0.6 + 50, width }}>
                        <VideoPlayer
                            provider={streamType.toLowerCase()}
                            videoSource={videoSource}
                            streamEmbed={streamEmbed}
                            zoomUrl={isUserHosting ? startUrl : startUrl}
                            eventId={event.id}
                            isPublisher={isUserHosting}
                        />

                        {/* <WebView
                            // useWebKit={true}
                            // scrollEnabled={false}
                            source={{
                                uri: videoSource,
                            }}
                            allowsFullscreenVideo
                            allowsInlineMediaPlayback
                            mediaPlaybackRequiresUserAction
                        /> */}
                        {/* <WebView
                            useWebKit={true}
                            scrollEnabled={false}
                            source={{
                                uri: videoSource,
                            }}
                            allowsInlineMediaPlayback
                            geolocationEnabled
                            javaScriptEnabled
                            allowsFullscreenVideo
                            style={classes.webView}
                            containerStyle={classes.webViewContainer}
                            scalesPageToFit
                            automaticallyAdjustContentInsets={false}
                        /> */}
                    </View>
                </View>

                {!isLandscape && (
                    <View style={classes.bottomOptions}>
                        <View style={classes.messaging}>
                            <View style={classes.messagesContainer}>
                                {comms ? (
                                    <Comments
                                        eventId={eventId}
                                        comments={comms}
                                        setComments={setComms}
                                    />
                                ) : (
                                    <ActivityIndicator color="white" />
                                )}
                            </View>
                            <View style={classes.rightOptions}>
                                {includesShopUrl && (
                                    <TouchableOpacity
                                        onPress={openStore}
                                        style={classes.regular}
                                    >
                                        <KwivrrIcon
                                            name="shopping-bag"
                                            color="white"
                                        />
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity
                                    onPress={openShareModal}
                                    style={classes.regular}
                                >
                                    <KwivrrIcon name="upload" color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <NewMessage
                            eventId={eventId}
                            comments={comms}
                            setComments={setComms}
                            eventRoomMemberId={eventRoomMemberId}
                            isBanned={isBanned}
                            isBlocked={isBlocked}
                        />
                    </View>
                )}
            </SafeAreaView>
            {modal && (
                <KwivrrModal close={() => setModal(false)} absoluteCloseButton>
                    <AttendeeModal
                        eventId={eventId}
                        eventRoomMemberId={eventRoomMemberId}
                    />
                </KwivrrModal>
            )}
        </React.Fragment>
    );
}

export default LiveStreamPage;
