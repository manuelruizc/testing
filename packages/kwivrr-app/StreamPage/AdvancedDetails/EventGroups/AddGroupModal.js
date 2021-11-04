import React from 'react';
import KwivrrModal from 'kwivrr-ui/KwivrrModal';
import EventGroupsModal from 'kwivrr-ui/EventGroupsModal/EventGroupsModal';
import useDeviceActions from 'kwivrr-hooks/useDeviceActions';
import usePlatform from 'kwivrr-hooks/usePlatftorm';

function AddGroupModal({ groups, setGroups, close }) {
    const { keyboardActive, keyboardHeight } = useDeviceActions();
    const { isiOS } = usePlatform();
    return (
        <KwivrrModal
            scrollViewKeyboard
            usingScrollView={false}
            close={close}
            absoluteCloseButton
            title="Manage Groups"
            modalStyle={{
                marginBottom: keyboardActive && isiOS ? keyboardHeight : 0,
            }}
        >
            <EventGroupsModal setGroups={setGroups} groups={groups} />
        </KwivrrModal>
    );
}

export default AddGroupModal;
