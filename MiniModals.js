import React, { useEffect } from 'react';
import SearchBar from 'kwivrr-app/SearchBar';
import UserMenu from 'kwivrr-app/UserMenu';
import UserNotifications from 'kwivrr-app/UserNotifications';
import { useDropdowns } from 'kwivrr-common/MiniModalsContext';
import useSearch from 'kwivrr-hooks/useSearch';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';

function MiniModals({ navigationRef }) {
    const {
        closeAllModals,
        isMenuActive,
        isNotificationsActive,
        isSearchbarActive
    } = useDropdowns();
    const { userIsLogginIn } = useAuthCredentials();
    const { setSearchTerm } = useSearch();

    useEffect(() => {
        if (userIsLogginIn) {
            closeAllModals();
            setSearchTerm('');
        }
    }, [userIsLogginIn]);
    return (
        <>
            {isMenuActive && <UserMenu navigationRef={navigationRef} />}
            {isNotificationsActive && <UserNotifications navigationRef={navigationRef} />}
            {isSearchbarActive && <SearchBar navigationRef={navigationRef} />}
        </>
    );
}

export default MiniModals;
