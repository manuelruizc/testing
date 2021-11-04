import React, { useState } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import TextRegular from '../../TextRegular';
import KwivrrIcon from '../../KwivrrIcon';
import useTheme from 'kwivrr-hooks/useTheme';
import InputComponent from '../../InputComponent';
import useConfirmModal from 'kwivrr-hooks/useConfirmModal';
import useActions from 'kwivrr-hooks/useActions';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';

function Group({
    group,
    setGroups,
    setSingleGroupEditing,
    singleGroupEditing,
    index,
}) {
    const {
        userInfo: { user_id: userId },
    } = useAuthCredentials();
    const { onDeleteEventGroup, onUpdateEventGroup } = useActions();
    const { openConfirmModal } = useConfirmModal();
    const classes = useStyles(styles);
    const { palette } = useTheme();
    const { id, title } = group;
    const [editingValue, setEditingValue] = useState(title);

    const deleteGroup = async () => {
        try {
            // POST TO API
            // add confirm modal
            await onDeleteEventGroup({ userId, id });
            setGroups((prevGroups) => {
                prevGroups = prevGroups.filter((g) => g.id !== id);
                return [...prevGroups];
            });
        } catch (e) {
            Alert.alert('Error on deleting group');
        }
    };

    const askForItemDelete = () => {
        openConfirmModal(
            [
                'Are you sure you want to delete this group?',
                'Cancel',
                'Confirm',
            ],
            deleteGroup,
            []
        );
    };

    const cancelEditing = () => {
        setSingleGroupEditing(-1);
        setEditingValue(title);
    };

    const saveEditing = async () => {
        try {
            await onUpdateEventGroup({ userId: 'me', id, title: editingValue });
            setGroups((prevGroups) => {
                prevGroups[index].title = editingValue;
                return [...prevGroups];
            });
            setSingleGroupEditing(-1);
        } catch (e) {
            Alert.alert('Error on deleting group');
        }
    };

    if (singleGroupEditing === index) {
        return (
            <View style={classes.container}>
                <InputComponent
                    autoFocus
                    value={editingValue}
                    onChangeText={(text) => setEditingValue(text)}
                    style={{ width: '74%' }}
                    inputStyle={classes.input}
                />
                <View style={classes.options}>
                    <TouchableOpacity
                        disabled={title === editingValue}
                        style={{ opacity: title === editingValue ? 0.6 : 1 }}
                        onPress={saveEditing}
                    >
                        <KwivrrIcon
                            name="check"
                            color={palette.button.primary}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={cancelEditing}
                        style={classes.trash}
                    >
                        <KwivrrIcon name="x" color="tomato" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={classes.container}>
            <TextRegular>{title}</TextRegular>
            <View style={classes.options}>
                <TouchableOpacity onPress={() => setSingleGroupEditing(index)}>
                    <KwivrrIcon name="edit" color={palette.button.primary} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={askForItemDelete}
                    style={classes.trash}
                >
                    <KwivrrIcon name="trash" color="tomato" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Group;
