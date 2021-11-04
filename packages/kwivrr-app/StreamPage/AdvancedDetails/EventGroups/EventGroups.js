import React, { useEffect, useMemo, useState } from 'react';
import { TouchableOpacity, View, Keyboard } from 'react-native';
import TextRegular from 'kwivrr-ui/TextRegular';
import styles from './styles';
import useStyles from 'kwivrr-hooks/useStyles';
import useTheme from 'kwivrr-hooks/useTheme';
import KwivrrModal from 'kwivrr-ui/KwivrrModal';
import EventGroupsModal from 'kwivrr-ui/EventGroupsModal/EventGroupsModal';
import useDeviceActions from 'kwivrr-hooks/useDeviceActions';
import { memo } from 'react';
import AddGroupModal from './AddGroupModal';
import Select from 'kwivrr-ui/Select/Select';

function EventGroups({ data, setFieldValue }) {
    const [addGroupModal, setAddGroupModal] = useState(false);
    const [groups, setGroups] = useState(data);
    const [selectedGroups, setSelectedGroups] = useState([]);
    const isDataEmpty = useMemo(() => groups.length === 0, [groups]);
    const classes = useStyles(styles);
    const { palette } = useTheme();

    useEffect(() => {
        setFieldValue('marketing.groups', groups);
    }, [groups]);

    const selectOptions = useMemo(
        () => groups.map(({ title }) => ({ label: title, value: title })),
        [groups]
    );

    console.log(selectOptions);

    // useEffect(() => {
    //     setGroups([...data.data]);
    // }, []);

    const [testing, setTesting] = useState(false);
    useEffect(() => {
        if (addGroupModal) {
            setTimeout(() => {
                setTesting(true);
            }, 1500);
        }
    }, [setTesting, addGroupModal]);

    return (
        <React.Fragment>
            <View style={classes.container}>
                <TextRegular>Stream Group</TextRegular>
                <View
                    style={
                        isDataEmpty
                            ? classes.containerDataEmpty
                            : classes.containerData
                    }
                >
                    {!isDataEmpty && (
                        <View style={classes.groupSelection}>
                            <Select
                                multiple={true}
                                listMode="SCROLLVIEW"
                                scrollViewProps={{
                                    nestedScrollEnabled: true,
                                }}
                                min={0}
                                max={10}
                                value={selectedGroups}
                                style={classes.inputStyle}
                                options={selectOptions}
                                dropDownDirection="TOP"
                                mode="BADGE"
                                showBadgeDot={false}
                                placeholder="No groups selected"
                                placeholderStyle={{
                                    color: 'rgba(0, 0, 0, 0.2)',
                                    fontSize: 15,
                                    fontFamily: 'Rubik-Light',
                                }}
                                onChange={(value) =>
                                    setSelectedGroups([...value])
                                }
                            />
                        </View>
                    )}
                    <TouchableOpacity onPress={() => setAddGroupModal(true)}>
                        <TextRegular color={palette.button.primary}>
                            {isDataEmpty ? '+ Create Group' : 'Manage Groups'}
                        </TextRegular>
                    </TouchableOpacity>
                </View>
            </View>
            {addGroupModal && (
                <AddGroupModal
                    groups={groups}
                    setGroups={setGroups}
                    close={() => setAddGroupModal(false)}
                    // keyboardActive={keyboardActive}
                />
            )}
        </React.Fragment>
    );
}

export default memo(EventGroups);
