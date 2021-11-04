import React, { useMemo } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import { useDropdowns } from 'kwivrr-common/MiniModalsContext';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';
import TextRegular from '../TextRegular';
import useTheme from 'kwivrr-hooks/useTheme';
import imageSourceWithoutCache from 'kwivrr-common/imageSourceWithoutCache';

function HeaderRight(props) {
    const {
        openNotifications,
        closeNotifications,
        openMenu,
        closeMenu,
        isNotificationsActive,
        isMenuActive,
    } = useDropdowns();
    const { userInfo } = useAuthCredentials();
    const { palette } = useTheme();
    const firstLetter = useMemo(() => {
        if (!userInfo) return '';
        if (!userInfo.firstName) return '';
        if (!userInfo.firstName.length) return '';
        return userInfo.firstName[0];
    }, [userInfo]);

    return (
        <View
            style={{
                width: 130,
                height: '100%',
                justifyContent: 'flex-end',
                alignItems: 'center',
                flexDirection: 'row',
            }}
        >
            <TouchableOpacity
                onPress={() => {
                    if (isNotificationsActive) {
                        closeNotifications();
                    } else {
                        openNotifications();
                    }
                }}
            >
                <View
                    style={{
                        width: 40,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 10,
                    }}
                >
                    <KwivrrIcon name="bell" size={26} color="white" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    if (isMenuActive) {
                        closeMenu();
                    } else {
                        openMenu();
                    }
                }}
            >
                <View
                    style={{
                        width: 52,
                        height: 52,
                        borderRadius: 52,
                        marginLeft: 10,
                        overflow: 'hidden',
                        marginRight: 12,
                    }}
                >
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            borderRadius: 1000,
                            backgroundColor: palette.placeholder,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <TextRegular size={16}>{firstLetter}</TextRegular>
                    </View>
                    {userInfo?.has_avatar_image && (
                        <Image
                            source={{
                                uri: imageSourceWithoutCache(userInfo.avatar),
                            }}
                            resizeMode="cover"
                            style={{ width: '100%', height: '100%' }}
                        />
                    )}
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default HeaderRight;
