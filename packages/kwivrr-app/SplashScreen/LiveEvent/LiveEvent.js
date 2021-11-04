import React, { useMemo } from 'react';
import { Image, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useDimensions from 'kwivrr-hooks/useDimensions';
import AuthButton from 'kwivrr-ui/AuthButton';
import TextHeader from 'kwivrr-ui/TextHeader';
import LiveBug from 'kwivrr-ui/LiveBug';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';
import { LIVESTREAM, STACKS } from 'kwivrr-common/data/types/navigation';
import isEventDigital from 'kwivrr-common/isEventDigital';

function LiveEvent({
    hasTicket = false,
    isSoldOut = false,
    shareInfo,
    eventId,
    openModal,
    event,
    isFreeEvent,
    vipTicketPrice,
    generalTicketPrice,
    isDigital,
    hostId,
}) {
    const { screenHeight } = useDimensions();
    const { userInfo } = useAuthCredentials();
    const { navigate } = useNavigation();
    const { userIsLogged } = useAuthCredentials();
    const buttonText = useMemo(() => {
        if (userInfo?.user_id === hostId && isDigital) return 'Watch Now';
        if (userIsLogged && isFreeEvent && isDigital) {
            return 'Watch Now';
        }
        if (userIsLogged && isFreeEvent && !isDigital) {
            return 'In Progress';
        }
        if (hasTicket && isDigital && userIsLogged) {
            return 'Watch Now';
        }
        if (hasTicket && !isDigital && userIsLogged) {
            return 'In Progress';
        }
        if (isSoldOut) {
            return 'SOLD OUT';
        }
        return 'Buy Tickets';
    }, [
        isSoldOut,
        hasTicket,
        vipTicketPrice,
        generalTicketPrice,
        userIsLogged,
        isDigital,
        hostId,
        userInfo,
    ]);

    const backgroundColor = useMemo(() => {
        if (userInfo?.user_id === hostId && isDigital) return '#4ACC79';
        if (userIsLogged && isFreeEvent && !isDigital) {
            return '#67BFDC';
        }
        if (userIsLogged && isFreeEvent && isDigital) {
            return '#4ACC79';
        }
        if (hasTicket && userIsLogged) {
            return '#4ACC79';
        }
        if (isSoldOut) {
            return '#C9C9C9';
        }
        return '#67BFDC';
    }, [
        isSoldOut,
        hasTicket,
        vipTicketPrice,
        generalTicketPrice,
        userIsLogged,
        isDigital,
        userInfo,
        hostId,
    ]);

    const onPress = () => {
        if (!isDigital) return;
        if (
            (userIsLogged && isFreeEvent) ||
            (userInfo.user_id === hostId && isDigital)
        ) {
            // flow without check
            return navigate(STACKS.LIVESTREAM, {
                params: {
                    eventId,
                },
                screen: LIVESTREAM.STREAM,
            });
        }
        if (userIsLogged && !hasTicket) {
            return openModal();
        }
        if (userIsLogged && hasTicket) {
            // flow to check ticket
            return navigate(STACKS.LIVESTREAM, {
                params: {
                    eventId,
                },
                screen: LIVESTREAM.STREAM,
            });
        }
        alert('You need to login or create an account to buy tickets.');
    };

    return (
        <View
            style={{
                width: '100%',
                height: screenHeight * 0.32,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Image
                source={{
                    uri: 'https://images.unsplash.com/photo-1559223607-b4d0555ae227?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
                }}
                resizeMode="cover"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                }}
            />
            <View
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                }}
            />
            <AuthButton
                disabled={
                    (isSoldOut && !hasTicket) ||
                    (!isDigital && isSoldOut) ||
                    !isDigital
                }
                backgroundColor={backgroundColor}
                uppercase={false}
                buttonStyle={{
                    width: 'auto',
                    paddingHorizontal: 38,
                    paddingVertical: 10,
                }}
                onPress={onPress}
            >
                <TextHeader size={16} color="white">
                    {buttonText}
                </TextHeader>
            </AuthButton>
            <LiveBug style={{ top: 24 }} />
        </View>
    );
}

export default LiveEvent;
