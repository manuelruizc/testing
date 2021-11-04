import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import TextRegular from '../TextRegular';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import KwivrrHeader from '../KwivrrHeader/KwivrrHeader';
import Divider from '../Divider/Divider';
import KwivrrIcon from '../KwivrrIcon';
import AuthButton from '../AuthButton';

function WaitListModal({ eventInfo, closeModal }) {
    const { eventImage, eventStartDatetime, eventName, hostName, avatar } =
        eventInfo;
    const [addToWaitlist, setAddToWaitlist] = useState(false);
    const classes = useStyles(styles);
    return (
        <View style={classes.container}>
            <KwivrrHeader
                eventImage={eventImage}
                eventStartDatetime={eventStartDatetime}
                eventName={eventName}
                avatar={avatar}
                hostName={hostName}
            />
            <Divider style={classes.divider} />
            <TouchableOpacity
                onPress={() =>
                    setAddToWaitlist((prevAddToWaitlist) => !prevAddToWaitlist)
                }
                style={[
                    classes.addToWaitlist,
                    addToWaitlist && classes.addToWaitlistChecked,
                ]}
            >
                <TextRegular
                    size={16}
                    color={addToWaitlist ? 'white' : '#70DAA0'}
                >
                    Add To Waitlist
                </TextRegular>
                {addToWaitlist && (
                    <View style={classes.checkMark}>
                        <KwivrrIcon name="check" color="white" />
                    </View>
                )}
            </TouchableOpacity>
            <AuthButton
                backgroundColor="#3551A1"
                buttonStyle={classes.buttonStyle}
                textFontSize={18}
                uppercase={false}
                textColor="white"
                onPress={closeModal}
                disabled={!addToWaitlist}
            >
                Confirm
            </AuthButton>
            <TouchableOpacity onPress={closeModal} style={classes.closeModal}>
                <TextRegular>Close</TextRegular>
            </TouchableOpacity>
        </View>
    );
}

WaitListModal.propTypes = {
    eventInfo: PropTypes.shape({
        eventImage: PropTypes.string.isRequired,
        eventStartDatetime: PropTypes.string.isRequired,
        eventName: PropTypes.string.isRequired,
        hostName: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
    }).isRequired,
    closeModa: PropTypes.func.isRequired,
};

export default WaitListModal;
