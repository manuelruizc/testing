import React, { useState, useRef, useMemo } from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import Group from './Group';
import TextRegular from '../TextRegular';
import useTheme from 'kwivrr-hooks/useTheme';
import InputComponent from '../InputComponent';
import AuthButton from '../AuthButton';
import { memo } from 'react';
import useActions from 'kwivrr-hooks/useActions';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';

function EventGroupsModal({ groups, setGroups, closeModal }) {
    const classes = useStyles(styles);
    const {
        userInfo: { user_id: userId },
    } = useAuthCredentials();
    const { onCreateEventGroup } = useActions();
    const scrollViewRef = useRef(null);
    const [isAddingNewGroup, setIsAddingNewGroup] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');
    // -1 editing is false for all, >= 0 you're editing that group
    const [singleGroupEditing, setSingleGroupEditing] = useState(-1);
    const { palette } = useTheme();

    const addNewGroup = async () => {
        // await response here to get the new item id...
        const { id } = await onCreateEventGroup({
            userId,
            title: newGroupName,
        });
        setGroups((prevGroups) => [...prevGroups, { id, title: newGroupName }]);
        //action here
        setIsAddingNewGroup(false);
        setNewGroupName('');
    };

    const onContentSizeChange = () => {
        if (groups.length > 3) {
            scrollViewRef.current?.scrollToEnd();
        }
    };

    const namesAlreadyExists = useMemo(
        () => groups.find((g) => g.title === newGroupName),
        [groups, newGroupName]
    );

    return (
        <View style={classes.container}>
            {groups.length > 0 ? (
                <View style={classes.scrollViewContainer}>
                    <ScrollView
                        ref={scrollViewRef}
                        showsVerticalScrollIndicator={false}
                        onContentSizeChange={onContentSizeChange}
                        style={{ flex: 1, width: '100%' }}
                    >
                        {groups.map((group, index) => (
                            <Group
                                group={group}
                                index={index}
                                key={index}
                                setGroups={setGroups}
                                setSingleGroupEditing={setSingleGroupEditing}
                                singleGroupEditing={singleGroupEditing}
                            />
                        ))}
                    </ScrollView>
                </View>
            ) : (
                <View style={classes.noGroupsContainer}>
                    <TextRegular>No Groups</TextRegular>
                </View>
            )}
            {isAddingNewGroup ? (
                <View style={classes.addingNewGroup}>
                    <InputComponent
                        autoFocus
                        style={classes.inputContainer}
                        inputStyle={classes.input}
                        value={newGroupName}
                        onChangeText={(text) => setNewGroupName(text)}
                    />
                    <AuthButton
                        disabled={namesAlreadyExists}
                        onPress={addNewGroup}
                        style={{ width: '30%' }}
                        textFontSize={18}
                        textColor={palette.common.white}
                        backgroundColor={palette.button.primary}
                    >
                        Save
                    </AuthButton>
                </View>
            ) : (
                <View style={classes.addGroupContainer}>
                    <TouchableOpacity onPress={() => setIsAddingNewGroup(true)}>
                        <TextRegular
                            style={classes.addNewGroupText}
                            color={palette.button.primary}
                        >
                            + Add New Group
                        </TextRegular>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

export default memo(EventGroupsModal);
