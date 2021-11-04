import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import useDimensions from 'kwivrr-hooks/useDimensions';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import KwivrrImage from 'kwivrr-ui/KwivrrImage';
import Header from './Header';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';
import TextHeader from 'kwivrr-ui/TextHeader';
import Shop from './Shop';
import Touchable from 'kwivrr-ui/Touchable';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import KwivrrModal from 'kwivrr-ui/KwivrrModal';
import { CREATE, HOME, STACKS } from 'kwivrr-common/data/types/navigation';
import useTheme from 'kwivrr-hooks/useTheme';
import AddShopItem from './AddShopItem/AddShopItem';
import { useIsFocused } from '@react-navigation/native';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';
import UpcomingEvents from './UpcomingEvents';
import UpcomingEventHosting from './UpcomingEventHosting';
import AttendedEvents from './AttendedEvents';
import imageSourceWithoutCache from 'kwivrr-common/imageSourceWithoutCache';

function UserProfile({ userProfile, navigation, route }) {
    const { userInfo, userIsNotLogged } = useAuthCredentials();
    const [addShopItemModal, setAddShopItemModal] = useState(false);
    const [shopItems, setShopItems] = useState([]);
    const { userId } = route.params;

    const translationY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler((event) => {
        translationY.value = event.contentOffset.y;
    });
    const { screenWidth, screenHeight } = useDimensions();
    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: screenWidth,
            height: screenHeight * 0.4,
            position: 'absolute',
            top: -screenHeight * 0.08,
            left: 0,
            transform: [
                {
                    scale: interpolate(
                        translationY.value,
                        [-500, 0, screenHeight * 0.24],
                        [4, 1, 1.2],
                        Extrapolate.CLAMP
                    ),
                },
                {
                    translateY: interpolate(
                        translationY.value,
                        [0, screenHeight * 0.24],
                        [0, screenHeight * 0.08],
                        Extrapolate.CLAMP
                    ),
                },
            ],
        };
    });
    const settingsButtonStyle = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            top: 6,
            right: 26,
            zIndex: 1000,
            transform: [
                {
                    scale: interpolate(
                        translationY.value,
                        [screenHeight * 0.19, screenHeight * 0.195],
                        [1, 0],
                        Extrapolate.CLAMP
                    ),
                },
            ],
            opacity: interpolate(
                translationY.value,
                [screenHeight * 0.08, screenHeight * 0.19],
                [1, 0],
                Extrapolate.CLAMP
            ),
        };
    });
    const onSettingsPress = () => {
        navigation?.navigate(HOME.ACCOUNT_SETTINGS);
    };
    const { palette } = useTheme();
    const classes = useStyles(styles);

    const isCurrentUser = useMemo(
        () => (userIsNotLogged ? false : userInfo.id === userId),
        [userId, userInfo, userIsNotLogged]
    );

    // change back to camelcase
    const { avatarUrl, firstName, lastName } = userProfile;

    console.log('userProfiles', userProfile);

    return (
        <View style={classes.container}>
            <Animated.View style={animatedStyle}>
                <KwivrrImage
                    style={classes.coverImage}
                    // change back to camelcase
                    // source={{ uri: userProfile.attributes.bannerUrl }}
                    source={{
                        uri: imageSourceWithoutCache(userProfile.bannerUrl),
                    }}
                />
            </Animated.View>
            {isCurrentUser && (
                <Animated.View style={settingsButtonStyle}>
                    <Touchable onPress={onSettingsPress}>
                        <KwivrrIcon
                            name="settings"
                            size={24}
                            color={palette.common.white}
                        />
                    </Touchable>
                </Animated.View>
            )}
            <Animated.ScrollView
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                style={classes.scrollStyle}
                contentContainerStyle={classes.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Header
                    avatarUrl={avatarUrl}
                    name={`${firstName} ${lastName}`}
                    data={userProfile}
                />
                <View style={classes.row}>
                    <TextHeader size={16} style={classes.rowTitle}>
                        Upcoming Attending Events
                    </TextHeader>
                    <UpcomingEvents
                        label="No upcoming events."
                        ctaText="Discover events"
                        ctaOnPress={() => {
                            navigation?.navigate(HOME.INITIAL);
                        }}
                        attendeeId={userId}
                    />
                </View>

                <View style={classes.row}>
                    <TextHeader size={16} style={classes.rowTitle}>
                        Upcoming Hosting Events
                    </TextHeader>
                    <UpcomingEventHosting
                        hostId={userId}
                        label="No upcoming events."
                        ctaText="Host an event"
                        ctaOnPress={() => {
                            navigation?.navigate(STACKS.CREATE, {
                                screen: CREATE.CREATEEVENT,
                            });
                        }}
                    />
                </View>

                <View style={classes.row}>
                    <View style={classes.rowHeaderWithOption}>
                        <TextHeader size={16} style={classes.rowTitle}>
                            Shop
                        </TextHeader>
                        {isCurrentUser && (
                            <Touchable
                                onPress={() => setAddShopItemModal(true)}
                                style={classes.addShopItem}
                            >
                                <KwivrrIcon
                                    name="plus"
                                    color={palette.button.primary}
                                    size={24}
                                />
                            </Touchable>
                        )}
                    </View>
                    <Shop
                        setShopItems={setShopItems}
                        shopItems={shopItems}
                        userId={isCurrentUser ? 'me' : userId}
                        isCurrentUser={isCurrentUser}
                    />
                </View>

                <View style={classes.row}>
                    <TextHeader size={16} style={classes.rowTitle}>
                        Attended Events
                    </TextHeader>
                    <AttendedEvents
                        attendeeId={userId}
                        label="No attended events."
                        ctaText="Discover events"
                        ctaOnPress={() => {
                            navigation?.navigate(HOME.INITIAL);
                        }}
                    />
                </View>
                {/* <View style={classes.row}>
                    <View style={classes.rowHeaderWithOption}>
                        <TextHeader size={16} style={classes.rowTitle}>
                            Shop
                        </TextHeader>
                        {isCurrentUser && (
                            <Touchable
                                onPress={() => setAddShopItemModal(true)}
                                style={classes.addShopItem}
                            >
                                <KwivrrIcon
                                    name="plus"
                                    color={palette.button.primary}
                                    size={24}
                                />
                            </Touchable>
                        )}
                    </View>
                    <Shop articles={shopItems} />
                </View>
                <View style={classes.row}>
                    <TextHeader size={16} style={classes.rowTitle}>
                        Events You Attended
                    </TextHeader>
                    <Events events={attendedEvents} />
                </View> */}
            </Animated.ScrollView>
            {addShopItemModal && (
                <KwivrrModal
                    title="Add Item"
                    close={() => setAddShopItemModal(false)}
                >
                    <AddShopItem setShopItems={setShopItems} />
                </KwivrrModal>
            )}
        </View>
    );
}

export default UserProfile;
