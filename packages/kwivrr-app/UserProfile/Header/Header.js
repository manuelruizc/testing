import React, { useMemo, useState } from 'react';
import { View, Linking } from 'react-native';
import faker from 'faker';
import Touchable from 'kwivrr-ui/Touchable';
import TextHeader from 'kwivrr-ui/TextHeader';
import TextRegular from 'kwivrr-ui/TextRegular';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import KwivrrModal from 'kwivrr-ui/KwivrrModal';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import KwivrrImage from 'kwivrr-ui/KwivrrImage';
import * as WebBrowser from 'expo-web-browser';
import useTheme from 'kwivrr-hooks/useTheme';
import imageSourceWithoutCache from 'kwivrr-common/imageSourceWithoutCache';
import { useShareModal } from 'kwivrr-hooks/useShareModal';

const socialMedias = {
    facebook: true,
    instagram: true,
    pinterest: true,
    blogger: true,
    linkedin: true,
    twitter: true,
};

function isValidHttpUrl(url) {
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    return 'https://' + url;
}

function Header({ avatarUrl, name, data }) {
    const classes = useStyles(styles);
    const { openUserProfileShareModal } = useShareModal();
    const { palette } = useTheme();
    const [avatarModalActive, setAvatarModalActive] = useState(false);
    const socialMediaLinks = useMemo(() => {
        const keys = Object.keys(data);
        const links = [];
        keys.forEach((key) => {
            if (socialMedias[key]) {
                if (data[key] !== null) {
                    if (data[key].length) {
                        links.push({
                            url: data[key],
                            socialMedia: key,
                        });
                    }
                }
            }
        });
        return links;
    }, [data]);

    const openSocialMedia = (socialMedia, url) => {
        const validUrl = isValidHttpUrl(url);
        Linking.openURL(validUrl);
    };

    const openStore = async () => {
        // change back to camelcase
        const validUrl = isValidHttpUrl(data.shopUrl);
        const result = await WebBrowser.openBrowserAsync(validUrl, {
            // const result = await WebBrowser.openBrowserAsync(data.shopLink, {
            dismissButtonStyle: 'close',
            controlsColor: palette.loading.indicator,
            readerMode: true,
        });
    };

    const showEmail = useMemo(
        () => data.email?.length && data.showEmail,
        [data.email, data.showEmail]
    );

    const showPhone = useMemo(() => {
        return data.phone?.length > 0;
    }, [data.phone]);

    const showShopLink = useMemo(
        () => data?.shopUrl !== null && data.shopUrl?.length > 0,
        [data.shopUrl]
    );

    const showTagline = useMemo(
        () => data.tagline && data.tagline.length > 0,
        [data.tagline]
    );

    return (
        <>
            <View style={classes.container}>
                <View style={classes.topInfo}>
                    <View style={classes.sideIcons}>
                        {showEmail && (
                            <Touchable
                                onPress={() =>
                                    Linking.openURL(`mailto:${data.email}`)
                                }
                            >
                                <KwivrrIcon name="mail" />
                            </Touchable>
                        )}
                        {showPhone && (
                            <Touchable
                                onPress={() =>
                                    Linking.openURL(`tel:${data.phone}`)
                                }
                            >
                                <KwivrrIcon name="phone" />
                            </Touchable>
                        )}
                        {showShopLink && (
                            <Touchable onPress={openStore}>
                                <KwivrrIcon name="shopping-cart" />
                            </Touchable>
                        )}

                        <Touchable
                            onPress={() =>
                                openUserProfileShareModal({
                                    eventName: name,
                                    eventImage: avatarUrl,
                                    shareUrl: data.shareUrl,
                                })
                            }
                        >
                            <KwivrrIcon name="upload" />
                        </Touchable>
                    </View>
                    <View style={classes.avatarContainer}>
                        <Touchable
                            onPress={() => setAvatarModalActive(true)}
                            style={classes.avatar}
                        >
                            <KwivrrImage
                                style={classes.avatarImage}
                                source={{
                                    uri: imageSourceWithoutCache(avatarUrl),
                                }}
                            />
                        </Touchable>
                    </View>
                    <View style={classes.sideIconsSocialMedia}>
                        {socialMediaLinks.map((socialMediaLink) => (
                            <Touchable
                                style={classes.sideIconSocialMedia}
                                key={socialMediaLink.socialMedia}
                                onPress={() =>
                                    openSocialMedia(
                                        socialMediaLink.socialMedia,
                                        socialMediaLink.url
                                    )
                                }
                            >
                                <KwivrrIcon
                                    name={`logo-${socialMediaLink.socialMedia}`}
                                />
                            </Touchable>
                        ))}
                    </View>
                </View>
                <View style={classes.bottomInfo}>
                    <TextHeader style={classes.name} size={18}>
                        {name}
                    </TextHeader>
                    {showTagline ? (
                        <TextRegular style={classes.tagline}>
                            {data.tagline}
                        </TextRegular>
                    ) : null}
                </View>
            </View>
            {avatarModalActive && (
                <KwivrrModal
                    modalStyle={{ ...classes.modalStyle }}
                    modalInnerStyle={{ ...classes.innerModalStyle }}
                    close={() => setAvatarModalActive(false)}
                    usingScrollView={false}
                    closeButtonColor="white"
                >
                    <KwivrrImage
                        style={{ width: 240, height: 240, borderRadius: 240 }}
                        source={{ uri: imageSourceWithoutCache(avatarUrl) }}
                    />
                </KwivrrModal>
            )}
        </>
    );
}

export default Header;
