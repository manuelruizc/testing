import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import useStyles from 'kwivrr-hooks/useStyles';
import parentStyles from '../../styles';
import styles from './styles';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import InputComponent from 'kwivrr-ui/InputComponent';
import TextSubHeader from 'kwivrr-ui/TextSubHeader';
import { SmallDatePicker } from '../../shared';
import DatePicker from 'kwivrr-ui/DatePicker';
import SpeakerSelected from './SpeakerSelected';
import AutoCompleteInput from 'kwivrr-ui/AutoCompleteInput';
import kwivrrApi from 'kwivrr-common/sdk';

function AdditionalSpeakers({
    additionalSpeakers,
    removeSpeaker,
    resetSpeakerInfo,
    editSpeakerField,
    openCreateSpeakerModal,
}) {
    const [searchedUsers, setSearchedUsers] = useState([]);
    const parentClasses = useStyles(parentStyles);
    const classes = useStyles(styles);
    const [searchUserTem, setSearchUserTem] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [currentSpeaker, setCurrentSpeaker] = useState({ key: '', idx: -1 });
    const showDatePicker = (key, idx) => {
        setCurrentSpeaker({ key, idx });
        setIsVisible(true);
    };
    const handleConfirm = (date) => {
        const datee = date.toString();
        editSpeakerField(currentSpeaker.key, currentSpeaker.idx, datee);
        setIsVisible(false);
    };

    const onPressSearchItem = (item, currentSpeakerIndex) => {
        editSpeakerField('speaker', currentSpeakerIndex, item);
    };

    const searchUsers = async (term) => {
        try {
            const response = await kwivrrApi.searchSpeakerProfilesAndUsers({
                term,
                userId: 'me',
            });
            setSearchedUsers(response.entries);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <View style={[parentClasses.additionalSpeakers, { zIndex: 0 }]}>
            {additionalSpeakers.map((additionalSpeaker, idx) => {
                const { speaker } = additionalSpeaker;
                const { firstName, lastName, name } = speaker;
                const speakerSelected =
                    firstName?.length || lastName?.length || name?.length;
                return (
                    <React.Fragment key={idx}>
                        {speakerSelected ? (
                            <SpeakerSelected
                                idx={idx}
                                resetSpeaker={resetSpeakerInfo}
                                speaker={speaker}
                            />
                        ) : (
                            <View
                                style={[
                                    classes.autocompleteContainer,
                                    {
                                        borderTopWidth: idx > 0 ? 1 : 0,
                                        zIndex: 0,
                                    },
                                ]}
                            >
                                <AutoCompleteInput
                                    value={searchUserTem}
                                    onChangeText={(text) =>
                                        setSearchUserTem(text)
                                    }
                                    onSearch={(searchTerm) =>
                                        searchUsers(searchTerm)
                                    }
                                    style={{
                                        ...classes.autocompleteInputContainer,
                                        zIndex: 10,
                                    }}
                                    placeholder="Search Kwivrr Users"
                                    label="Speaker"
                                    inputStyle={{ ...parentClasses.inputStyle }}
                                    labelSize={14}
                                    labelColor="black"
                                    data={searchedUsers}
                                    onPressItem={(item) =>
                                        onPressSearchItem(item, idx)
                                    }
                                />
                                <View style={classes.verticalDivider} />
                                <TouchableOpacity
                                    onPress={() => openCreateSpeakerModal(idx)}
                                    style={classes.addNewButton}
                                >
                                    <KwivrrIcon
                                        name="plus"
                                        color="white"
                                        size={24}
                                    />
                                </TouchableOpacity>
                            </View>
                        )}
                        <InputComponent
                            value={additionalSpeaker.topic}
                            onChangeText={(text) => {
                                editSpeakerField('topic', idx, text);
                            }}
                            style={classes.inputContainer}
                            placeholder="Session Topic"
                            label="Topic"
                            inputStyle={{ ...parentClasses.inputStyle }}
                            labelSize={14}
                            labelColor="black"
                        />
                        <InputComponent
                            value={additionalSpeaker.description}
                            onChangeText={(text) => {
                                editSpeakerField('description', idx, text);
                            }}
                            style={classes.inputContainer}
                            multiline
                            placeholder={`Stream Description & Disclaimer`}
                            label="Description"
                            inputStyle={{
                                ...parentClasses.inputStyle,
                                height: 120,
                            }}
                            labelSize={14}
                            labelColor="black"
                        />
                        <View style={classes.dateTimeSettings}>
                            <SmallDatePicker
                                id="startTime"
                                label="Start Time"
                                style={classes.smallDatetimePickerContainer}
                                formValues={additionalSpeaker}
                                onPress={() => showDatePicker('startTime', idx)}
                                dateFormatted={false}
                            />
                            <SmallDatePicker
                                id="endTime"
                                label="End Time"
                                style={classes.smallDatetimePickerContainer}
                                formValues={additionalSpeaker}
                                onPress={() => showDatePicker('endTime', idx)}
                                dateFormatted={false}
                            />
                        </View>
                        <TouchableOpacity onPress={() => removeSpeaker(idx)}>
                            <TextSubHeader color="#F1465A" size={16}>
                                - Remove Speaker
                            </TextSubHeader>
                        </TouchableOpacity>
                    </React.Fragment>
                );
            })}
            <DatePicker
                isVisible={isVisible}
                onConfirm={handleConfirm}
                mode="datetime"
                onCancel={() => setIsVisible(false)}
            />
        </View>
    );
}

AdditionalSpeakers.propTypes = {
    additionalSpeakers: PropTypes.array.isRequired,
    removeSpeaker: PropTypes.func.isRequired,
    editSpeakerField: PropTypes.func.isRequired,
    openCreateSpeakerModal: PropTypes.func.isRequired,
};

export default AdditionalSpeakers;
