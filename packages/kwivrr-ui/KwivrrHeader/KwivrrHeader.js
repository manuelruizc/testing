import React from 'react';
import { Button, Image, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import TextRegular from 'kwivrr-ui/TextRegular';
import TextHeader from 'kwivrr-ui/TextHeader';
import TextSubHeader from 'kwivrr-ui/TextSubHeader';
import Avatar from 'kwivrr-ui/Avatar';
import { useShareModal } from 'kwivrr-hooks/useShareModal';
import EventActions from 'kwivrr-common/EventActions';
import KwivrrImage from '../KwivrrImage';
import imageSourceWithoutCache from 'kwivrr-common/imageSourceWithoutCache';

function KwivrrHeader({
    eventImage,
    eventStartDatetime,
    eventName,
    avatar,
    hostName,
}) {
    const classes = useStyles(styles);
    return (
        <View style={classes.container}>
            {/* <TouchableOpacity
                onPress={onBack}
                style={classes.backButtonContainer}
            >
                <KwivrrIcon
                    name="arrow-left"
                    size={24}
                    style={{ marginRight: 6 }}
                />
                <TextRegular size={16}>Back</TextRegular>
            </TouchableOpacity> */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                }}
            >
                <KwivrrImage
                    source={{ uri: imageSourceWithoutCache(eventImage) }}
                    resizeMode="cover"
                    style={classes.image}
                    includingKwivrrBackground
                />
                <View style={classes.infoContainer}>
                    <TextHeader
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        size={18}
                        style={classes.streamTitle}
                    >
                        {eventName}
                    </TextHeader>
                    <TextSubHeader>{eventStartDatetime}</TextSubHeader>
                    {/* {isHost && (
                        <ButtonsSection
                            event={event}
                            onPressDelete={onPressDelete}
                            onPress={onPress}
                            eventName={eventName}
                            eventImage={eventImage}
                            eventStartDatetime={eventStartDatetime}
                            openModal={openModal}
                            // eventUrl={'url'}
                        />
                    )} */}
                    <Host avatar={avatar} hostName={hostName} />
                </View>
            </View>
        </View>
    );
}

function Host({ hostName, avatar }) {
    const classes = useStyles(styles);
    return (
        <View style={classes.hostContainer}>
            <Avatar
                size={20}
                style={{ marginRight: 4 }}
                source={{ uri: imageSourceWithoutCache(avatar) }}
            />
            <TextRegular>{hostName}</TextRegular>
        </View>
    );
}

// function ButtonsSection({
//     event,
//     onPress,
//     onPressDelete,
//     eventStartDatetime,
//     eventName,
//     eventImage,
//     openModal,
// }) {
//     const classes = useStyles(styles);
//     const { openModal: _openShareModal } = useShareModal();
//     const openShareModal = () => {
//         _openShareModal({
//             eventStartDatetime,
//             eventName,
//             eventImage,
//         });
//     };
//     return (
//         <View style={classes.buttonsContainer}>
//             <EventActions
//                 eventInfo={event}
//                 action="share"
//                 onPress={openShareModal}
//             />
//             <EventActions eventInfo={event} action="edit" />
//             <EventActions
//                 eventInfo={event}
//                 action="customTicket"
//                 onPress={() => openModal('Sell Custom Ticket', null)}
//             />
//             <EventActions eventInfo={event} action="clone" />
//             <EventActions eventInfo={event} action="delete" />
//         </View>
//     );
// }

KwivrrHeader.propTypes = {
    avatar: PropTypes.string,
    eventStartDatetime: PropTypes.string.isRequired,
    eventImage: PropTypes.string,
    eventName: PropTypes.string.isRequired,
    host: PropTypes.string.isRequired,
    isHost: PropTypes.bool,
    onPress: PropTypes.func,
    onPressDelete: PropTypes.func,
};

export default KwivrrHeader;
