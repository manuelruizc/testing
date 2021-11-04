import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Avatar from 'kwivrr-ui/Avatar';
import TextRegular from 'kwivrr-ui/TextRegular';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import { HOME, STACKS } from 'kwivrr-common/data/types/navigation';
import imageSourceWithoutCache from 'kwivrr-common/imageSourceWithoutCache';

function Header({ avatar, hostName, isSoldOut, hostId }) {
    const { navigate } = useNavigation();
    const navigateToUserProfile = () => {
        navigate(STACKS.HOME, {
            params: {
                avatar,
                name: hostName,
                userId: hostId,
            },
            screen: HOME.USER_PROFILE,
        });
    };
    const classes = useStyles(styles);
    return (
        <View style={classes.container}>
            <TouchableOpacity
                onPress={navigateToUserProfile}
                style={classes.touchable}
            >
                <Avatar
                    source={{ uri: imageSourceWithoutCache(avatar) }}
                    style={classes.avatar}
                />
                <TextRegular size={16}>{hostName}</TextRegular>
            </TouchableOpacity>
            {isSoldOut && (
                <TextRegular size={18} style={classes.soldOutText}>
                    SOLD OUT
                </TextRegular>
            )}
        </View>
    );
}

Header.propTypes = {
    avatar: PropTypes.string.isRequired,
    hostName: PropTypes.string.isRequired,
    isSoldOut: PropTypes.bool.isRequired,
};

export default Header;
