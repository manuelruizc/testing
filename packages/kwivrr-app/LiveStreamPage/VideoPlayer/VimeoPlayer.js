import useDimensions from 'kwivrr-hooks/useDimensions';
import React from 'react';
import WebView from 'react-native-webview';

const HEIGHT_16_9 = 0.5625;

const VimeoPlayer = ({ videoId, videoSource, onError = () => {} }) => {
    const { screenWidth } = useDimensions();
    return (
        <WebView
            useWebKit={true}
            scrollEnabled={false}
            source={{
                uri: videoSource,
            }}
            allowsInlineMediaPlayback
            geolocationEnabled
            javaScriptEnabled
            allowsFullscreenVideo
            style={{ width: screenWidth, height: screenWidth * HEIGHT_16_9 }}
            scalesPageToFit
            automaticallyAdjustContentInsets={false}
        />
    );
    return (
        <WebView
            style={{ width: screenWidth, height: screenWidth * HEIGHT_16_9 }}
            onError={onError}
            allowsFullscreenVideo
            scrollEnabled={false}
            automaticallyAdjustContentInsets
            source={{
                html: `
            <html>
                <head>
                    <style>
                    * {
                        margin: 0;
                        padding: 0;
                    }
                    </style>
                </head>
              <body>
                <iframe src="https://player.vimeo.com/video/${videoId}" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                <script src="https://player.vimeo.com/api/player.js"></script>
              </body>
            </html>
          `,
            }}
        />
    );
};

const style = {
    height: 200,
    width: '100%',
};

export default VimeoPlayer;
