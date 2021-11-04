import React, { useEffect, useMemo, useState } from 'react';
import {
    View,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    Linking,
    Dimensions,
    Alert,
} from 'react-native';
import faker from 'faker';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
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
import AuthButton from 'kwivrr-ui/AuthButton';
import useTheme from 'kwivrr-hooks/useTheme';
import * as WebBrowser from 'expo-web-browser';
// import Touchable from 'kwivrr-ui/Touchable';
// import KwivrrModal from 'kwivrr-ui/KwivrrModal';
import * as Permissions from 'expo-permissions';
import vimeoParser from 'kwivrr-common/vimeoParser';

const { width, height } = Dimensions.get('window');

const DATA = [
    {
        id: 1,
        comment: 'Hello from Berlin 😎',
        username: 'Richard Daniels',
        time: '8 min',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
        id: 2,
        comment: 'Amazing content keep it up',
        username: 'Darla James',
        time: '5 min',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
        id: 3,
        comment: 'Just beautiful',
        username: 'Danielle Mendes',
        time: '4 min',
        avatar: 'https://images.unsplash.com/photo-1586522434115-38d718beeca5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
    },
    {
        id: 4,
        comment: 'Where can I buy these?',
        username: 'Doris Becker',
        time: '4 min',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
        id: 5,
        comment: 'Hello from Berlin 😎',
        username: 'Richard Daniels',
        time: '3 min',
        avatar: 'https://images.unsplash.com/photo-1603503345686-bfafb8cfea02?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHdvbWFuJTIwZmFjZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    },
    {
        id: 6,
        comment: 'Wow! good luck',
        username: 'Maria Campbell',
        time: '2 min',
        avatar: 'https://images.unsplash.com/photo-1615751596346-9df8006e5381?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDh8fHdvbWFuJTIwZmFjZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    },
    {
        id: 7,
        comment: 'Thanks for making this possible',
        username: 'Joanna Fernandez',
        time: '1 min',
        avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTB8fHdvbWFuJTIwZmFjZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    },
];
// const _url =
//     'https://www.youtube.com/embed/va-YqajM0mo?autoplay=1&playsinline=1';
const _url =
    'https://player.vimeo.com/video/582593560?title=0&playsinline=1&autoplay=1&controls=0';

function randomEvent() {
    const boolean = faker.datatype.boolean();
    return boolean ? 'zoom' : 'video';
}

function getYoutubeLink(link) {}

function getVideoSource(embedCode, provider) {
    const textSplitted = embedCode.split(' ');
    const src_ = textSplitted.find((text) => text.startsWith('src'));
    const source = src_.split('"')[1];
    if (provider === 'YouTube') {
        return source;
    }
    if (provider === 'Vimeo') {
        let id = vimeoParser(source);
        const a = `https://player.vimeo.com/video/${id}?title=0&playsinline=1&autoplay=1`;
        // const b = `https://player.vimeo.com/video/${613_358_842}?title=0&playsinline=1&autoplay=1`;
        // alert(JSON.stringify({ a, id, c: 'asdas' }));
        return a;
    }
}

function LiveStreamPage({ navigation, route, event }) {
    const [modal, setModal] = useState(false);
    const [eventType, setEventType] = useState(null);
    const { setParams, navigate, setOptions } = navigation;
    const { openModal } = useShareModal();
    const [url, setUrl] = useState(null);
    const classes = useStyles(styles);
    const [orientation, setOrientation] = useState(0);
    const [comms, setComms] = useState(null);
    const { version, OS, isAndroid } = usePlatform();
    const { palette } = useTheme();
    const { data, included } = event;

    const { shop_url: shopUrl } = data.attributes;

    const providerInfo = useMemo(() => {
        const info = included.find((inc) => inc.type === 'provider').attributes;
        return info;
    }, [included]);
    // const setInitialScreen = async () => {
    //     await ScreenOrientation.lockAsync(
    //         ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
    //     );
    //     await ScreenOrientation.unlockAsync();
    // };
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

    useEffect(() => {
        setTimeout(() => {
            setComms(DATA);
        }, 1200);
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
            clearInterval(interval);
            subscription.remove();
        };
    }, []);

    async function getLocationAsync() {
        // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
        // const { status, permissions } = await Permissions.askAsync(
        //     Permissions.AUDIO_RECORDING
        // );
        // if (status === 'granted') {
        //     // alert('nice');
        // } else {
        //     throw new Error('Location permission not granted');
        // }
    }

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
        // Linking.openURL(
        //     'https://us05web.zoom.us/j/82840194134?pwd=UmVROUViT2x4d2FtRi9sb2VWb2RQUT09'
        // );
        let result = await WebBrowser.openBrowserAsync(
            'https://www.manuelruizc.com/zoomtest'
        );
        setResult(result);
        // let result = await WebBrowser.openBrowserAsync('https://expo.dev');
        setResult(result);
    };

    const openShareModal = () => {
        openModal({
            eventImage: event.data.attributes.event_image_url,
            eventName: event.data.attributes.name,
            eventStartDatetime: event.data.attributes.start_date,
            url: 'https://www.youtube.com/google',
        });
    };

    const goToFullScreen = async () => {
        setOptions({ headerShown: false });
        await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
        );
        // await ScreenOrientation.unlockAsync();
    };
    const { screenWidth, screenHeight } = useDimensions();
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            setEventType(randomEvent());
        }
        // if (!isFocused) {
        //     setParams({ url: undefined });
        //     setData([]);
        //     clearInterval(interval);
        //     setIntervalState(null);
        // } else {
        //     setTimeout(() => {
        //         setData([...DATA]);
        //         setIntervalState(() => {
        //             setInterval(() => {
        //                 clearInterval(interval);
        //                 setData((prev) => {
        //                     const newComments = prev;
        //                     newComments.push({
        //                         id: faker.datatype.uuid(),
        //                         comment: faker.lorem.sentence(),
        //                         username: faker.name.findName(),
        //                         time: 'now',
        //                         avatar: faker.image.avatar(),
        //                     });
        //                     return [...newComments];
        //                 });
        //             }, 6000);
        //         });
        //     }, 1700);
        // }
    }, [isFocused]);

    const videoSource = useMemo(() => {
        return getVideoSource(
            providerInfo.embed_code,
            providerInfo.provider_type
        );
    }, [providerInfo]);

    const isYoutube = useMemo(() => {
        const youtubeRegex = new RegExp(
            '^(https?://)?(www.)?(youtube.com|youtu.?be)/.+$'
        );
        if (youtubeRegex.test(url)) {
            return true;
        }
        return false;
    }, [url]);

    if (!isFocused || !eventType) {
        return <></>;
    }
    // if (isAndroid) {
    //     return (
    //         <View
    //             style={{
    //                 flex: 1,
    //                 justifyContent: 'center',
    //                 alignItems: 'center',
    //             }}
    //         >
    //             <Touchable onPress={openZommm}>
    //                 <TextRegular>OpenBrowser</TextRegular>
    //             </Touchable>
    //         </View>
    //     );
    // }
    // return (
    //     <SafeAreaView style={{ flex: 1 }}>
    //         <View style={{ height: width * 0.5625 + 140, width }}>
    //             <WebView
    //                 useWebKit={true}
    //                 source={{
    //                     uri: 'https://www.manuelruizc.com/zoomtest/meeting.html',
    //                 }}
    //                 // source={{uri: 'https://www.youtube.com/embed/CUfm3dB7lOk?autoplay=1&playsinline=1'}}
    //                 // source={{uri: 'https://player.vimeo.com/video/561517421?title=0&playsinline=1'}}
    //                 allowsInlineMediaPlayback
    //                 geolocationEnabled
    //                 javaScriptEnabled
    //                 allowsFullscreenVideo
    //                 style={classes.webView}
    //                 containerStyle={classes.webViewContainer}
    //                 originWhitelist={['*']}
    //                 scalesPageToFit={false}
    //                 // mediaPlaybackRequiresUserAction={
    //                 //     OS !== 'android' || version >= 17 ? false : undefined
    //                 // }
    //                 mediaPlaybackRequiresUserAction={false}
    //                 // userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
    //                 // userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
    //                 // userAgent={
    //                 //     isYoutube
    //                 //         ? 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36'
    //                 //         : undefined
    //                 // }
    //             />
    //         </View>
    //         {/* <Touchable
    //             onPress={() => setModal(true)}
    //             style={{ position: 'absolute', top: 200, right: 5 }}
    //         >
    //             <View
    //                 style={{
    //                     borderRadius: 1000,
    //                     padding: 30,
    //                     opacity: 24,
    //                     backgroundColor: 'purple',
    //                 }}
    //             />
    //         </Touchable> */}
    //         {modal && <KwivrrModal close={() => setModal(false)}></KwivrrModal>}
    //     </SafeAreaView>
    // );

    return (
        <SafeAreaView style={classes.container}>
            <View
                style={
                    // isLandscape
                    //     ? { width: screenWidth, height: screenHeight }
                    // :
                    { width: '100%' } // clean this later
                }
            >
                <View style={classes.viewerStatusContainer}>
                    <LiveBug
                        fontSize={isAndroid ? 14 : 16}
                        absolute={false}
                        style={{ ...classes.liveBug }}
                    />
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
                            16
                        </TextRegular>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            navigate(STACKS.HOME);
                        }}
                        style={classes.closeButton}
                    >
                        <KwivrrIcon name="x" color="white" />
                    </TouchableOpacity>
                </View>

                <View style={{ height: width * 0.6 + 50, width }}>
                    {/* <WebView
                            // source={{
                            //     uri: 'http://192.168.1.142:9999/meeting.html?name=TG9jYWwxLjkuN01hYyNjaHJvbWUvOTIuMC40NTE1LjEzMQ%3D%3D&mn=85006746538&email=&pwd=yg9DKG&role=0&lang=en-US&signature=MUxJYW8yQlpRQkNFcFk5N0RERWEwQS44NTAwNjc0NjUzOC4xNjI4MjczNjg4MzYyLjAuU0dTUVpaaFRwWmpTVW5ZVitNejVLVVJhQSt2S1ZJM2UyT0M3T1NRckUyRT0&china=0&apiKey=1LIao2BZQBCEpY97DDEa0A',
                            // }}
                            source={{
                                uri: 'https://www.youtube.com/embed/gD7k4o8JBJI?autoplay=1&playsinline=1',
                            }}
                            source={{
                                uri: 'https://player.vimeo.com/video/584002580?title=0&playsinline=1',
                            }}
                            allowsInlineMediaPlayback
                            allowsFullscreenVideo
                            style={classes.webView}
                            containerStyle={classes.webViewContainer}
                            mediaPlaybackRequiresUserAction={
                                OS !== 'android' || version >= 17
                                    ? false
                                    : undefined
                            }
                            // userAgent={
                            //     isYoutube
                            //         ? 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36'
                            //         : undefined
                            // }
                        /> */}
                    <WebView
                        useWebKit={true}
                        scrollEnabled={false}
                        // source={{
                        //     uri: 'https://www.manuelruizc.com/zoomtest/meeting.html',
                        // }}
                        // source={{uri: 'https://www.youtube.com/embed/CUfm3dB7lOk?autoplay=1&playsinline=1'}}
                        source={{
                            uri: videoSource,
                        }}
                        allowsInlineMediaPlayback
                        geolocationEnabled
                        javaScriptEnabled
                        allowsFullscreenVideo
                        style={classes.webView}
                        containerStyle={classes.webViewContainer}
                        // originWhitelist={['*']}
                        // scalesPageToFit={false}
                        scalesPageToFit
                        mediaPlaybackRequiresUserAction={
                            OS !== 'android' || version >= 17
                                ? false
                                : undefined
                        }
                        automaticallyAdjustContentInsets={false}
                        // mediaPlaybackRequiresUserAction={false}
                        // userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
                        // userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
                        // userAgent={
                        //     isYoutube
                        //         ? 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36'
                        //         : undefined
                        // }
                    />
                </View>
                {/* ) : (
                    <View
                        style={[
                            classes.videoContainer,
                            {
                                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                justifyContent: 'center',
                                alignItems: 'center',
                            },
                        ]}
                    >
                        <AuthButton
                            style={{ width: 'auto' }}
                            buttonStyle={{
                                paddingHorizontal: 32,
                                paddingVertical: 12,
                            }}
                            backgroundColor={palette.button.primary}
                            textColor="white"
                            textFontSize={18}
                            onPress={openZoomMeeting}
                        >
                            Join Zoom Meeting
                        </AuthButton>
                    </View>
                )} */}
            </View>

            {!isLandscape && (
                <View style={classes.bottomOptions}>
                    <View style={classes.messaging}>
                        <View style={classes.messagesContainer}>
                            {comms ? (
                                <Comments
                                    comments={comms}
                                    setComments={setComms}
                                />
                            ) : (
                                <ActivityIndicator color="white" />
                            )}
                        </View>
                        <View style={classes.rightOptions}>
                            {/* <TouchableOpacity
                                onPress={goToFullScreen}
                                style={classes.regular}
                            >
                                <KwivrrIcon name="maximize-2" color="white" />
                            </TouchableOpacity> */}
                            {shopUrl.length > 0 && (
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
                    <NewMessage comments={comms} setComments={setComms} />
                </View>
            )}
        </SafeAreaView>
    );
}

export default LiveStreamPage;
