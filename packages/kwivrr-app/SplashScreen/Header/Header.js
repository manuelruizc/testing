import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import TextRegular from 'kwivrr-ui/TextRegular';
import PropTypes from 'prop-types';
import { HOME, STACKS } from 'kwivrr-common/data/types/navigation';
import imageSourceWithoutCache from 'kwivrr-common/imageSourceWithoutCache';

function Header({ hostName, avatar, hostId }) {
    const { navigate } = useNavigation();
    const navigateToUserProfile = () => {
        navigate(HOME.USER_PROFILE, {
            avatar,
            name: hostName,
            userId: hostId,
        });
    };

    return (
        <TouchableOpacity
            onPress={navigateToUserProfile}
            activeOpacity={0.8}
            style={{
                width: '100%',
                borderRadius: 40,
                overflow: 'hidden',
                paddingVertical: 16,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Image
                style={{
                    width: 40,
                    height: 40,
                    marginBottom: 4,
                    borderRadius: 50,
                }}
                resizeMode="cover"
                source={{ uri: imageSourceWithoutCache(avatar) }}
            />
            <TextRegular size={20}>{hostName}</TextRegular>
        </TouchableOpacity>
    );
}

Header.propTypes = {
    hostName: PropTypes.string.isRequired,
    avatar: PropTypes.string,
};

export default Header;
