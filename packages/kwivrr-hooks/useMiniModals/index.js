import React, { useContext } from 'react';
import { MiniModalsContext } from 'kwivrr-common/MiniModalsContext'
import modalActionTypes from 'kwivrr-common/modalActionTypes';

const {
    UPDATE_NOTIFICATIONS,
    UPDATE_SEARCHBAR,
    UPDATE_MENU,
    CLOSE_ALL_MODALS
} = modalActionTypes;

function useMinimodals() {
    const { dispatch, state } = useContext(MiniModalsContext);
    const closeAllMiniModals = () => {
        dispatch({type: CLOSE_ALL_MODALS});
    }
    const closeSearchbar = () => {
        dispatch({type: UPDATE_NOTIFICATIONS, payload: {
            close: true,
            active: true
        }})
    }
    const closeNotifications = () => {
        dispatch({type: UPDATE_NOTIFICATIONS, payload: {
            close: true,
            active: true
        }})
    }
    const closeUserMenu = () => {
        dispatch({type: UPDATE_NOTIFICATIONS, payload: {
            close: true,
            active: true
        }})
    }
    const resetSearchbar = () => {
        dispatch({type: UPDATE_NOTIFICATIONS, payload: {
            close: false,
            active: false
        }})
    }
    const resetNotifications = () => {
        dispatch({type: UPDATE_NOTIFICATIONS, payload: {
            close: false,
            active: false
        }})
    }
    const resetUserMenu = () => {
        dispatch({type: UPDATE_NOTIFICATIONS, payload: {
            close: false,
            active: false
        }})
    }
    return {
        closeAllMiniModals,
        closeSearchbar,
        closeNotifications,
        closeUserMenu,
        resetSearchbar,
        resetNotifications,
        resetUserMenu
    }
}

export default useMinimodals;
