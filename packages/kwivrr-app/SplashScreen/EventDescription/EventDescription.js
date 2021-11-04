import React from 'react';
import { Alert, Linking, View } from 'react-native';
import PropTypes from 'prop-types';
import TextRegular from 'kwivrr-ui/TextRegular';
import { MarkdownView } from 'react-native-markdown-view';
import * as WebBrowser from 'expo-web-browser';
import usePlatform from 'kwivrr-hooks/usePlatftorm';

const _description = `Elevate is our annual, global convention
    
Join us this April in Dallas, Texas to commemorate our 10th year in business. We will be celebrating our top performers, providing world-class training and casting the vision that will carry us for the next Decade of Searcret Direct.

Don't miss out!

Hosted At:
The For Center at the Star
9 Cowboys Way
Firsco, TX 75034`;

function EventDescription({ description = _description }) {
    const { isAndroid } = usePlatform();
    const openLink = async (url) => {
        try {
            await WebBrowser.openBrowserAsync(url);
        } catch {
            Alert.alert('Web Browser Error', "Couldn't open the url");
        }
    };
    const openLinkAndroid = (url) => {
        Linking.openURL(url).catch((error) =>
            Alert.alert('Web Browser Error', "Couldn't open the url")
        );
    };

    return (
        <View
            style={{
                width: '100%',
                paddingHorizontal: 22,
                paddingVertical: 32,
            }}
        >
            <MarkdownView
                onLinkPress={(url) =>
                    isAndroid ? openLinkAndroid(url) : openLink(url)
                }
            >
                {description}
            </MarkdownView>
        </View>
    );
}

EventDescription.propTypes = {
    description: PropTypes.string,
};

export default EventDescription;
