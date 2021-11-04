import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    ImageBackground,
    SafeAreaView,
    Image,
    TouchableOpacity,
    Platform,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import LiveBug from 'kwivrr-ui/LiveBug/LiveBug';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import TextRegular from 'kwivrr-ui/TextRegular';
import TextSubHeader from 'kwivrr-ui/TextSubHeader';
import TextHeader from 'kwivrr-ui/TextHeader';
// import {  } from 'react/cjs/react.development';
import { useNavigation } from '@react-navigation/native';
import Comments from './Comments';
import NewMessage from './NewMessage';

const DATA = [
    {
        id: 1,
        comment: 'Hello from Berlin 😎',
        username: 'Richard Daniels',
        time: '8 min',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
        id: 2,
        comment: 'Amazing content keep it up',
        username: 'Darla James',
        time: '5 min',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
        id: 3,
        comment: 'Just beautiful',
        username: 'Danielle Mendes',
        time: '4 min',
        avatar: 'https://images.unsplash.com/photo-1586522434115-38d718beeca5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
    },
    {
        id: 4,
        comment: 'Where can I buy these?',
        username: 'Doris Becker',
        time: '4 min',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
        id: 5,
        comment: 'Hello from Berlin 😎',
        username: 'Richard Daniels',
        time: '3 min',
        avatar: 'https://images.unsplash.com/photo-1603503345686-bfafb8cfea02?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHdvbWFuJTIwZmFjZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    },
    {
        id: 6,
        comment: 'Wow! good luck',
        username: 'Maria Campbell',
        time: '2 min',
        avatar: 'https://images.unsplash.com/photo-1615751596346-9df8006e5381?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDh8fHdvbWFuJTIwZmFjZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    },
    {
        id: 7,
        comment: 'Thanks for making this possible',
        username: 'Joanna Fernandez',
        time: '1 min',
        avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTB8fHdvbWFuJTIwZmFjZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    },
];

function __deprecatedLiveStreamPage({ navigation }) {
    // const { goBack, reset } = navigation;
    const { navigate, goBack } = useNavigation();
    const classes = useStyles(styles);
    const [socialContainer, setSocialContainer] = useState(true);
    const [data, setData] = useState(null);
    useEffect(() => {
        setTimeout(() => {
            setData(DATA);
        }, 1200);
    }, []);
    return (
        <ImageBackground
            source={{
                uri: 'https://images.unsplash.com/photo-1582152629442-4a864303fb96?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
            }}
            resizeMode="cover"
            style={classes.imageBackground}
        >
            <SafeAreaView style={classes.container}>
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <Image
                        source={require('kwivrr-assets/logo/Icon/PNG/Kwivrr_Icon_Reverse.png')}
                        style={classes.logo}
                        resizeMode="contain"
                    />
                    <View style={classes.viewerStatusContainer}>
                        <LiveBug
                            absolute={false}
                            style={{ ...classes.liveBug }}
                        />
                        <View style={classes.viewersContainer}>
                            <KwivrrIcon name="eye" color="white" />
                            <TextRegular
                                style={classes.viewerCount}
                                color="white"
                                size={16}
                            >
                                16
                            </TextRegular>
                        </View>
                    </View>
                    <TextSubHeader
                        style={{ width: '90%', marginBottom: 32 }}
                        size={24}
                        color="white"
                    >
                        The Beach!
                    </TextSubHeader>
                    <TextRegular
                        style={{ width: '90%' }}
                        size={16}
                        color="white"
                    >
                        Stream Description!
                    </TextRegular>
                    <TouchableOpacity
                        onPress={goBack}
                        style={{
                            position: 'absolute',
                            top: 4,
                            right: 14,
                            padding: 8,
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10000,
                        }}
                    >
                        <KwivrrIcon name="x" color="white" />
                    </TouchableOpacity>
                </View>
                <View
                    pointerEvents={socialContainer ? 'auto' : 'none'}
                    style={{
                        ...classes.shareContainer,
                        opacity: socialContainer ? 1 : 0,
                    }}
                >
                    <View style={classes.closeContainer}>
                        <TouchableOpacity
                            onPress={() => setSocialContainer(false)}
                            style={classes.shareCloseButton}
                        >
                            <KwivrrIcon name="x" color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={classes.shareText}>
                        <TextHeader size={18} color="white">
                            Let people know you're live!
                        </TextHeader>
                    </View>
                    <View style={classes.shareOptions}>
                        <TouchableOpacity
                            onPress={() => share('sms')}
                            activeOpacity={0.6}
                        >
                            <Image
                                source={{
                                    uri:
                                        Platform.OS === 'android'
                                            ? 'https://play-lh.googleusercontent.com/OY4rxeNTPaHwyOTZ-RUooqJvPnO5QUYmQcw0dhD90Mu6UWItOSZfQv7ks_FscbBow0M'
                                            : 'https://images.macrumors.com/t/xzhWbTHDTsoOpWzQKqM2-TTdHuY=/400x0/filters:quality(90)/article-new/2020/07/messagesicon-200x200.png?lossy',
                                }}
                                style={classes.socialIcon}
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => share('whatsapp')}
                            activeOpacity={0.6}
                        >
                            <Image
                                source={{
                                    uri: 'https://image.flaticon.com/icons/png/512/124/124034.png',
                                }}
                                style={classes.socialIcon}
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => share('messenger')}
                            activeOpacity={0.6}
                        >
                            <Image
                                source={{
                                    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/1200px-Facebook_Messenger_logo_2020.svg.png',
                                }}
                                style={classes.socialIcon}
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => share('facebook')}
                            activeOpacity={0.6}
                        >
                            <Image
                                source={{
                                    uri: 'https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512',
                                }}
                                style={classes.socialIcon}
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={classes.bottomOptions}>
                    <View style={classes.messaging}>
                        <View style={classes.messagesContainer}>
                            {data ? (
                                <Comments
                                    comments={data}
                                    setComments={setData}
                                />
                            ) : (
                                <ActivityIndicator color="white" />
                            )}
                        </View>
                        <View style={classes.rightOptions}>
                            <TouchableOpacity style={classes.expand}>
                                <KwivrrIcon name="maximize-2" color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={classes.regular}>
                                <KwivrrIcon name="shopping-bag" color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={classes.regular}>
                                <KwivrrIcon name="upload" color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <NewMessage comments={data} setComments={setData} />
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

export default __deprecatedLiveStreamPage;
