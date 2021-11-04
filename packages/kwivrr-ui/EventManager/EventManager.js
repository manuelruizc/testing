import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    TouchableOpacity,
    View,
} from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import RadioButton from '../RadioButton';
import AutoCompleteInput from '../AutoCompleteInput';
import kwivrrApi from 'kwivrr-common/sdk';
import AuthButton from '../AuthButton';
import Avatar from '../Avatar';
import TextHeader from '../TextHeader';
import TextRegular from '../TextRegular';
import useTheme from 'kwivrr-hooks/useTheme';
import KwivrrIcon from '../KwivrrIcon';
import useActions from 'kwivrr-hooks/useActions';
import imageSourceWithoutCache from 'kwivrr-common/imageSourceWithoutCache';

function EventManager({ eventId }) {
    const { onCreateEventManager, onDeleteEventManager } = useActions();
    const [isLoading, setLoading] = useState(false);
    const { palette } = useTheme();
    const classes = useStyles(styles);
    const [isAdmin, setIsEventAdmin] = useState(false);
    const [searchUserTerm, setSearchUserTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [deletingId, setDeletingId] = useState(-1);

    const searchUsers = async (term) => {
        try {
            const response = await kwivrrApi.searchUsers({
                term,
            });
            setSearchedUsers(response.entries);
        } catch (e) {
            console.error(e);
            setSearchedUsers([]);
        }
    };

    const onPressSearchItem = (item, index) => {
        setUser(item);
    };

    const inviteUser = async (userId) => {
        try {
            setLoading(true);
            const role = isAdmin ? 'basic_cs' : 'ticket_taker';
            const payload = {
                eventId,
                userId,
                role,
            };
            const response = await onCreateEventManager(payload);
            const admins = await getEventManagers();
            const { entries } = admins;
            setUsers((prevUsers) => {
                // prevUsers.push(user);
                return [...entries];
            });
            setUser(null);
            setLoading(false);
        } catch (e) {
            Alert.alert('There was an error with the invitation');
            setUser(null);
            setLoading(false);
        }
    };

    const deleteAdmin = async (userId) => {
        try {
            setDeletingId(userId);
            setLoading(true);
            const response = await onDeleteEventManager({
                eventId,
                userId,
            });
            const admins = await getEventManagers();
            const { entries } = admins;
            setUsers([...entries]);
            setLoading(false);
            setDeletingId(-1);
        } catch (e) {
            Alert.alert('There was an error with the invitation');
            setLoading(false);
            setDeletingId(-1);
        }
    };

    const getEventManagers = async () => {
        try {
            const response = await kwivrrApi.getEventManagers({
                eventId,
            });
            return response;
        } catch (e) {
            return [];
        }
    };

    const setInitialManagers = async () => {
        try {
            const admins = await getEventManagers();
            const { entries } = admins;
            setUsers([...entries]);
        } catch (e) {
            setUsers([]);
        }
    };

    useEffect(() => {
        setInitialManagers();
    }, []);

    return (
        <View style={classes.container}>
            <View style={classes.radioButtonsContainer}>
                <RadioButton
                    onPress={() => setIsEventAdmin(false)}
                    selected={!isAdmin}
                    style={{ width: '84%', marginBottom: 12 }}
                    buttonStyle={{ marginRight: 12 }}
                    label="Event Admin"
                    subLabel="Can check in your guests"
                />
                <RadioButton
                    onPress={() => setIsEventAdmin(true)}
                    selected={isAdmin}
                    style={{ width: '84%', marginBottom: 12 }}
                    buttonStyle={{ marginRight: 12 }}
                    label="Admin"
                    subLabel="Can check in your guests and help manage ticket transfers"
                />
            </View>
            {user ? (
                <View style={classes.userSelectedContainer}>
                    <View style={classes.userSelected}>
                        <Avatar
                            source={{
                                uri: imageSourceWithoutCache(user.avatarUrl),
                            }}
                            style={{ marginRight: 6 }}
                        />
                        <TextRegular>
                            {user.firstName} {user.lastName}
                        </TextRegular>
                    </View>
                    <TouchableOpacity onPress={() => setUser(null)}>
                        <TextRegular color={palette.button.primary}>
                            Choose other user
                        </TextRegular>
                    </TouchableOpacity>
                </View>
            ) : (
                <AutoCompleteInput
                    value={searchUserTerm}
                    onChangeText={(text) => setSearchUserTerm(text)}
                    onSearch={(searchTerm) => searchUsers(searchTerm)}
                    style={{
                        ...classes.autocompleteInputContainer,
                        zIndex: 10,
                    }}
                    placeholder="Search Kwivrr Users"
                    // label="Deliver To"
                    inputStyle={{ ...classes.inputStyle }}
                    labelSize={14}
                    labelColor="black"
                    data={searchedUsers}
                    onPressItem={(item, index) =>
                        onPressSearchItem(item, index)
                    }
                    closeOnPress
                />
            )}
            <AuthButton
                backgroundColor="#3551A1"
                buttonStyle={{
                    width: 'auto',
                    paddingHorizontal: 42,
                    paddingVertical: 12,
                    marginTop: 32,
                    marginVertical: 18,
                }}
                textFontSize={18}
                uppercase={false}
                textColor="white"
                onPress={() => inviteUser(user.userId)}
                activityIndicatorColor="#FFFFFF"
                disabled={user === null}
                isLoading={isLoading && user}
                // isLoading={isLoading}
                // disabled={
                //     Object.keys(formik.errors).length > 0 || user === null
                // }
            >
                Invite
            </AuthButton>
            {users.length > 0 && (
                <View
                    style={[
                        classes.usersContainer,
                        { height: Math.min(users.length * 50, 150) },
                    ]}
                >
                    <ScrollView
                        style={{ flex: 1 }}
                        showsVerticalScrollIndicator={true}
                    >
                        {users.map((user, index) => {
                            const { avatarUrl, id, name, role } = user;
                            return (
                                <View style={classes.userContainer}>
                                    <View style={classes.userAdmin}>
                                        <Avatar
                                            size={32}
                                            source={{
                                                uri: imageSourceWithoutCache(
                                                    avatarUrl
                                                ),
                                            }}
                                        />
                                        <View style={classes.userAdminName}>
                                            <TextHeader size={16}>
                                                {name}
                                            </TextHeader>
                                            <TextRegular>
                                                {role === 'ticket_taker'
                                                    ? 'Event Admin'
                                                    : 'Admin'}
                                            </TextRegular>
                                        </View>
                                    </View>
                                    {isLoading && deletingId === id ? (
                                        <ActivityIndicator
                                            color="tomato"
                                            size="small"
                                        />
                                    ) : (
                                        <TouchableOpacity
                                            onPress={() => deleteAdmin(id)}
                                        >
                                            <KwivrrIcon
                                                name="trash"
                                                color="tomato"
                                            />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>
            )}
        </View>
    );
}

export default EventManager;
