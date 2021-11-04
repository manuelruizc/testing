import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Avatar, { AvatarSelectMedia } from 'kwivrr-ui/Avatar';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';
import KwivrrImage from 'kwivrr-ui/KwivrrImage';
import SelectCoverMedia from 'kwivrr-ui/SelectCoverMedia';
import useActions from 'kwivrr-hooks/useActions';

const AVATAR_SIZE = 120;

function Media({ userInfo: _userInfo }) {
    const { onUpdateUserAccount } = useActions();
    const { userInfo, setUserInfo } = useAuthCredentials();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        console.log(_userInfo);
        setUserInfo((prev) => ({ ...prev, ..._userInfo }));
        setIsLoaded(true);
    }, []);
    const [coverWidth, setCoverWidth] = useState(0);
    const {
        has_avatar_image: hasAvatarImage,
        has_banner_image: hasBannerImage,
    } = userInfo;
    const [avatar, setAvatar] = useState(
        hasAvatarImage ? userInfo.avatar : null
    );
    // const [initialAvatar] = useState(userInfo.avatar);
    const [cover, setCover] = useState(
        hasBannerImage ? userInfo.coverUrl : null
    );
    // const [intialCover] = useState(userInfo.coverUrl);
    const [mounted, setMounted] = useState(false);
    const onLayout = ({
        nativeEvent: {
            layout: { width },
        },
    }) => {
        setCoverWidth(width);
    };

    const onChange = async (imageObject, deleting = false) => {
        try {
            if (deleting) {
                const payload = { avatar_base64: null };
                onUpdateUserAccount(payload);
                setAvatar('');
                setUserInfo((prev) => ({
                    ...prev,
                    avatar: '',
                }));
                return;
            }
            const { uri } = imageObject;
            const { base64 } = uri;
            setAvatar(uri.uri);
            setUserInfo((prev) => ({
                ...prev,
                avatar: uri.uri,
            }));
            onUpdateUserAccount({ avatar_base64: base64 });
        } catch (e) {
            alert('error');
        }
    };

    const onCoverChange = async (imageObject, deleting = false) => {
        try {
            // if (!mounted) {
            //     alert('ypurere');
            //     setMounted(true);
            //     return;
            // }
            if (deleting) {
                const payload = { banner_base64: null };
                onUpdateUserAccount(payload);
                setAvatar('');
                setUserInfo((prev) => ({
                    ...prev,
                    coverUrl: '',
                }));
                return;
            }
            const { uri } = imageObject;
            const { base64 } = uri;
            setCover(uri.uri);
            setUserInfo((prev) => ({
                ...prev,
                coverUrl: uri.uri,
            }));
            const payload = { banner_base64: base64 };
            onUpdateUserAccount(payload);
        } catch (e) {
            alert(e);
        }
    };
    const classes = useStyles(styles, { coverWidth, avatarSize: AVATAR_SIZE });

    if (!isLoaded) return <React.Fragment></React.Fragment>;

    return (
        <View style={classes.container}>
            <View style={classes.coverUrl} onLayout={onLayout}>
                <SelectCoverMedia
                    source={{ uri: cover }}
                    style={classes.cover}
                    imageStyle={classes.image}
                    onChange={onCoverChange}
                    hasInitialImage={hasBannerImage}
                    hasDeleteButton
                />
            </View>
            <AvatarSelectMedia
                uri={avatar}
                avatarSize={AVATAR_SIZE}
                onChange={onChange}
                onPressIcon="upload"
                onPressIconColor="white"
                onPressIconBackgroundColor="#3551A1"
                style={classes.avatar}
                hasInitialImage={hasAvatarImage}
                hasDeleteButton
            />
        </View>
    );
}

export default Media;
