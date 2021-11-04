import React, { useEffect, useMemo, useState, memo } from 'react';
import {
    Image,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    View,
} from 'react-native';
import faker from 'faker';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import TextRegular from 'kwivrr-ui/TextRegular';
import TextHeader from 'kwivrr-ui/TextHeader';
import Avatar from 'kwivrr-ui/Avatar';
import useDimensions from 'kwivrr-hooks/useDimensions';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import useMinimodals from 'kwivrr-hooks/useMiniModals';
import { generateEvents } from './utils';
import LiveBug from 'kwivrr-ui/LiveBug';
import TicketPill from 'kwivrr-ui/TicketPill';
import { useShareModal } from 'kwivrr-hooks/useShareModal';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';
import AttendedEventsSection from './AttendedEventsSection';
import ShoppingSection from './ShoppingSection';
import EventCard from './EventCard';
import FootageCard from './FootageCard';
import { useIsFocused } from '@react-navigation/native';

function UserProfile({ route }) {
    const {
        avatar = 'https://www.okchicas.com/wp-content/uploads/2019/06/Actores-que-se-van-y-que-se-quedan-en-Marvel-1.png',
        name = 'Thor Odinson',
    } = route.params;
    const { userIsLogged } = useAuthCredentials();
    const isFocused = useIsFocused();
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [events, setEvents] = useState(generateEvents(userIsLogged));
    const { resetSearchbar } = useMinimodals();
    const [upcomingEvents, setUpcomingEvents] = useState('other');
    const filterBar = useSharedValue(false);
    const filterBarWidth = useSharedValue(0);
    const filterBarStyle = useAnimatedStyle(() => {
        return {
            width: '50%',
            height: '100%',
            backgroundColor: 'rgb(211, 105, 99)',
            position: 'absolute',
            top: 0,
            left: filterBar.value
                ? withTiming(filterBarWidth.value * 0.5, { duration: 200 })
                : withTiming(0, { duration: 200 }),
        };
    });
    const classes = useStyles(styles);
    const fetchEvents = () => {
        setEvents(null);
    };
    const changeFilter = (upcoming) => {
        'worklet';
        if (upcoming === upcomingEvents) return;
        runOnJS(setUpcomingEvents)(upcoming);
        runOnJS(fetchEvents)();
        filterBar.value = upcoming === 'attending';
    };
    useEffect(() => {
        if (!events) {
            setTimeout(() => {
                setEvents(generateEvents(userIsLogged));
            }, 1000);
        }
    }, [events]);

    useEffect(() => {
        if (!isFocused) {
            setLoadingProfile(null);
        } else {
            resetSearchbar();
            setTimeout(() => {
                setLoadingProfile(true);
            }, 1100);
        }
    }, [isFocused]);

    const LoadingComp = memo(({ height }) => {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: height ? height : 0,
                }}
            >
                <ActivityIndicator color="tomato" />
            </View>
        );
    });
    if (!loadingProfile) return <LoadingComp />;
    return (
        <View style={classes.container}>
            <ScrollView
                style={{ flex: 1, width: '100%', backgroundColor: 'white' }}
                contentContainerStyle={{
                    flexGrow: 1,
                    alignItems: 'center',
                    paddingBottom: 24,
                }}
                showsVerticalScrollIndicator={false}
            >
                <CoverImage
                    source={{
                        uri: 'https://i.pinimg.com/originals/36/fa/9d/36fa9d429168700be2bf4d3883784d3a.jpg',
                    }}
                    resizeMode="cover"
                />
                <View style={classes.userInfoContainer}>
                    <View style={classes.profilePicture}>
                        <Avatar size={80} source={{ uri: avatar }} />
                    </View>
                    <View style={classes.topInfo}>
                        <View style={classes.contactInfo}>
                            <View style={classes.email}>
                                <KwivrrIcon
                                    name="mail"
                                    size={18}
                                    style={{ marginRight: 4 }}
                                />
                                <TextRegular>thor@marvel.com</TextRegular>
                            </View>
                            <View style={classes.phone}>
                                <KwivrrIcon
                                    name="phone"
                                    size={18}
                                    style={{ marginRight: 4 }}
                                />
                                <TextRegular>631-555-2262</TextRegular>
                            </View>
                        </View>
                        <View style={classes.socialMedia}>
                            <TouchableOpacity
                                style={classes.social}
                                activeOpacity={0.6}
                            >
                                <KwivrrIcon size={20} name="facebook" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={classes.social}
                                activeOpacity={0.6}
                            >
                                <KwivrrIcon size={20} name="twitter" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={classes.social}
                                activeOpacity={0.6}
                            >
                                <KwivrrIcon size={20} name="linkedin" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...classes.social, marginRight: 0 }}
                                activeOpacity={0.6}
                            >
                                <KwivrrIcon size={20} name="instagram" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={classes.bottomInfo}>
                        <TouchableOpacity
                            style={[classes.bottomButton, classes.follow]}
                        >
                            <TextRegular color="white">+ Follow</TextRegular>
                        </TouchableOpacity>
                        <View style={classes.userData}>
                            <TextHeader
                                style={{
                                    textTransform: 'uppercase',
                                    letterSpacing: 1,
                                    width: '80%',
                                    textAlign: 'center',
                                }}
                                size={14}
                                color="rgba(0, 0, 0, 0.6)"
                            >
                                {name}
                            </TextHeader>
                            <TextRegular style={{ letterSpacing: 1 }}>
                                God of Thunder
                            </TextRegular>
                        </View>
                        <TouchableOpacity
                            style={[classes.bottomButton, classes.shop]}
                        >
                            <TextRegular color="white">Shop</TextRegular>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={classes.upcomingEvents}>
                    <View style={classes.header}>
                        <TextHeader style={{ textTransform: 'uppercase' }}>
                            Upcoming Events
                        </TextHeader>
                        <View
                            onLayout={({ nativeEvent }) => {
                                'worklet';
                                filterBarWidth.value = nativeEvent.layout.width;
                            }}
                            style={classes.filter}
                        >
                            <Animated.View style={filterBarStyle} />
                            <TouchableOpacity
                                style={classes.filterPressing}
                                onPress={() => changeFilter('other')}
                            >
                                <TextRegular
                                    color={
                                        upcomingEvents === 'other'
                                            ? 'white'
                                            : 'black'
                                    }
                                >
                                    Hosting
                                </TextRegular>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={classes.filterPressing}
                                onPress={() => changeFilter('attending')}
                            >
                                <TextRegular
                                    color={
                                        upcomingEvents === 'attending'
                                            ? 'white'
                                            : 'black'
                                    }
                                >
                                    Attending
                                </TextRegular>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={classes.eventsContainer}>
                        {events ? (
                            <ScrollView
                                style={{ flex: 1 }}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            >
                                {events.map((item, idx) => (
                                    <EventCard item={item} key={idx} />
                                ))}
                            </ScrollView>
                        ) : (
                            <LoadingComp height={113.5} />
                        )}
                    </View>
                </View>
                <View style={classes.footageContainer}>
                    <View style={{ ...classes.header, paddingHorizontal: 10 }}>
                        <TextHeader style={{ textTransform: 'uppercase' }}>
                            Footage
                        </TextHeader>
                        <TouchableOpacity>
                            <TextRegular
                                size={12}
                                color={'rgb(211, 105, 99)'}
                                style={{ textTransform: 'uppercase' }}
                            >
                                See entire library
                            </TextRegular>
                        </TouchableOpacity>
                    </View>
                    <View style={classes.footage}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingLeft: 12 }}
                        >
                            {[0, 0, 0, 0].map((_, idx) => (
                                <FootageCard id={idx + 1} key={idx} />
                            ))}
                        </ScrollView>
                    </View>
                </View>
                <ShoppingSection />
                <AttendedEventsSection />
            </ScrollView>
        </View>
    );
}

const CoverImage = (props) => {
    const { ...rest } = props;
    const classes = useStyles(styles);
    return <Image {...rest} style={classes.coverImage} />;
};

export default UserProfile;
