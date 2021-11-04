import AsyncStorage from '@react-native-async-storage/async-storage';
import usePlatform from 'kwivrr-hooks/usePlatftorm';
import AuthButton from 'kwivrr-ui/AuthButton';
import TextRegular from 'kwivrr-ui/TextRegular';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Linking, View } from 'react-native';
import WebView from 'react-native-webview';
import YoutubeIframe from 'react-native-youtube-iframe';
import VimeoPlayer from './VimeoPlayer';

const getUrlFromKwivrrWeb = (
    provider = 'resi',
    isPublisher = false,
    componentOnly = true,
    eventId,
    credentials
) => {
    const { accessToken, refreshToken } = credentials;
    let url;
    if (provider === 'kwivrr' && !isPublisher) {
        url = `https://onyx.kwivrr.com/#view=sso&accessToken=${accessToken}&refreshToken=${refreshToken}&returnPath=${encodeURIComponent(
            `/#view=livestream-sub&eventId=${eventId}${
                componentOnly ? '&pageMode=componentOnly' : ''
            }`
        )}`;
    } else if (provider === 'kwivrr' && isPublisher) {
        url = `https://onyx.kwivrr.com/#view=sso&accessToken=${accessToken}&refreshToken=${refreshToken}&returnPath=${encodeURIComponent(
            `/#view=livestream-pub&eventId=${eventId}${
                componentOnly ? '&pageMode=componentOnly' : ''
            }`
        )}`;
    } else if (provider === 'zoom' || provider === 'resi') {
        url = `https://onyx.kwivrr.com/#view=sso&accessToken=${accessToken}&refreshToken=${refreshToken}&returnPath=${encodeURIComponent(
            `/#view=livestream-embed&eventId=${eventId}${
                componentOnly ? '&pageMode=componentOnly' : ''
            }`
        )}`;
    }

    // if (componentOnly) {
    //     url += '&mode=componentOnly';
    // }

    return url;
};

const VideoPlayer = ({
    provider,
    videoSource,
    eventId,
    isPublisher,
    streamEmbed,
    zoomUrl,
}) => {
    const [theUrl, setUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(provider === 'kwivrr');
    const { isAndroid } = usePlatform();

    const getUrl = async () => {
        AsyncStorage.getItem('credentials')
            .then((credentials) => {
                let userCredentials;
                if (!credentials) {
                    userCredentials = null;
                } else {
                    userCredentials = JSON.parse(credentials);
                }
                let newUrl = getUrlFromKwivrrWeb(
                    provider,
                    isPublisher,
                    // provider !== 'kwivrr',
                    isAndroid
                        ? !(provider === 'kwivrr' && isPublisher && isAndroid)
                        : true,
                    eventId,
                    userCredentials
                );
                setUrl(newUrl);
            })
            .catch((e) => setUrl(null));
    };

    const onStartStream = () => {
        let streamUrl;
        if (provider === 'zoom') {
            streamUrl = zoomUrl;
        }
        if (provider === 'kwivrr') {
            streamUrl = theUrl;
        }
        Linking.openURL(streamUrl).catch((e) =>
            alert('There was an error with the url.')
        );
    };

    useEffect(() => {
        getUrl();
    }, []);

    // return <TextRegular>{provider}</TextRegular>;
    // const SSOUrl = getUrlFromKwivrrWeb(provider, isPublisher, true, eventId, );
    // if (provider === 'kwivrr' && isPublisher) {
    //     return (
    //         <View
    //             style={{
    //                 width: '100%',
    //                 height: '100%',
    //                 justifyContent: 'center',
    //                 alignItems: 'center',
    //             }}
    //         >
    //             <AuthButton
    //                 backgroundColor="#3551A1"
    //                 buttonStyle={{ width: '50%' }}
    //                 textFontSize={20}
    //                 uppercase={false}
    //                 textColor="white"
    //                 style={{ marginBottom: 36, marginTop: 24 }}
    //                 onPress={onStartStream}
    //             >
    //                 Start Stream
    //             </AuthButton>
    //         </View>
    //     );
    // }
    if (
        provider === 'zoom' ||
        (provider === 'kwivrr' && isPublisher && isAndroid)
    ) {
        return (
            <View
                style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <AuthButton
                    backgroundColor="#3551A1"
                    buttonStyle={{ width: '50%' }}
                    textFontSize={20}
                    uppercase={false}
                    textColor="white"
                    style={{ marginBottom: 36, marginTop: 24 }}
                    onPress={onStartStream}
                >
                    {isPublisher ? 'Start Stream' : 'Join Stream'}
                </AuthButton>
            </View>
        );
    }
    if (provider === 'kwivrr') {
        return (
            <View
                style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <View style={{ width: '100%', height: '100%' }}>
                    <WebView
                        onLoad={() => setIsLoading(false)}
                        useWebKit={true}
                        style={{ width: '100%', height: '100%' }}
                        originWhitelist={['*']}
                        allowsInlineMediaPlayback={true}
                        allowsFullscreenVideo={false}
                        scrollEnabled={false}
                        automaticallyAdjustContentInsets
                        allowsInlineMediaPlayback
                        source={{ uri: theUrl }}
                    />
                </View>
                {isLoading && (
                    <View
                        style={{
                            width: '100%',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                        }}
                    >
                        <TextRegular size={18} style={{ marginBottom: 8 }}>
                            Loading
                        </TextRegular>
                        <ActivityIndicator size="small" color="tomato" />
                    </View>
                )}
            </View>
        );
    }
    if (provider === 'youtube') {
        return (
            <YoutubeIframe
                height={300}
                play={true}
                videoId={videoSource.substr(-11)}
            />
        );
    }
    if (provider === 'vimeo') {
        return <VimeoPlayer videoId={'76979871'} videoSource={videoSource} />;
    }
    if (provider === 'resi') {
        const html = `
        <html>
            <head>
                <style>
                * {
                padding: 0 !important;
                margin: 0 !important;
            }
            div {
                width: 100vw !important;
                height: 100vh !important;
            }
            iframe {
                width: 100% !important;
                height: 100% !importnat;
            }
                </style>
            </head>
            <body>
                ${streamEmbed}
            </body>
        </html>
    `;
        return (
            <WebView
                allowsFullscreenVideo
                scrollEnabled={false}
                automaticallyAdjustContentInsets
                allowsInlineMediaPlayback
                source={{ html }}
            />
        );
    }
    if (provider === 'zoom') {
        return <TextRegular>{zoomUrl}</TextRegular>;
    }
    return <WebView source={{ uri: url }} />;
};

export default VideoPlayer;
