import React, { useContext } from 'react';
import modalActionTypes from 'kwivrr-common/modalActionTypes';

const {
    UPDATE_NOTIFICATIONS,
    UPDATE_SEARCHBAR,
    UPDATE_MENU,
    CLOSE_ALL_MODALS
} = modalActionTypes;
  
const initialState = {
    notifications: { active: false, close: false },
    searchbar: { active: false, close: false },
    menu: { active: false, close: false }
};
export const MiniModalsContext = React.createContext();
  
function reducer(state, action) {
    switch(action.type) {
        case CLOSE_ALL_MODALS:
            return {
                notifications: { active: false, close: false },
                searchbar: { active: false, close: false },
                menu: { active: false, close: false }
            };
        case UPDATE_NOTIFICATIONS:
            if (action.payload.active) {
                return {
                    searchbar: { active: false, close: false },
                    menu: { active: false, close: false },
                    notifications: action.payload
                }
            }
            return {
                ...state,
                notifications: action.payload
            };
        case UPDATE_SEARCHBAR:
            if (action.payload.active) {
                return {
                    notifications: { active: false, close: false },
                    menu: { active: false, close: false },
                    searchbar: action.payload
                };
            }
            return {
                ...state,
                searchbar: action.payload
            };
        case UPDATE_MENU:
            if (action.payload.active) {
                return {
                    notifications: { active: false, close: false },
                    searchbar: { active: false, close: false },
                    menu: action.payload
                };
            }
            return {
                ...state,
                menu: action.payload
            };
        default:
            return state;
    }
}
export function MiniModalsProvider({children}) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = {state, dispatch}
  return <MiniModalsContext.Provider value={value}>{children}</MiniModalsContext.Provider>
}

export function useDropdowns() {
    const { state, dispatch } = useContext(MiniModalsContext);
    const {
        menu,
        notifications,
        searchbar
    } = state;
    const closeSearchbar = () => {
        dispatch({
            type: UPDATE_SEARCHBAR,
            payload: { ...searchbar, close: true }
        });
    }
    const openSearchbar = () => {
        dispatch({
            type: UPDATE_SEARCHBAR,
            payload: { close: false, active: true }
        });
    }
    const unmountSearchbar = () => {
        dispatch({
            type: UPDATE_SEARCHBAR,
            payload: { active: false, close: false }
        });
    }
    const closeNotifications = () => {
        dispatch({
            type: UPDATE_NOTIFICATIONS,
            payload: { ...searchbar, close: true }
        });
    }
    const openNotifications = () => {
        dispatch({
            type: UPDATE_NOTIFICATIONS,
            payload: { close: false, active: true }
        });
    }
    const unmountNotifications = () => {
        dispatch({
            type: UPDATE_NOTIFICATIONS,
            payload: { active: false, close: true }
        });
    }
    const closeMenu = () => {
        dispatch({
            type: UPDATE_MENU,
            payload: { ...searchbar, close: true }
        });
    }
    const openMenu = () => {
        dispatch({
            type: UPDATE_MENU,
            payload: { close: false, active: true }
        });
    }
    const unmountMenu = () => {
        dispatch({
            type: UPDATE_MENU,
            payload: { active: false, close: true }
        });
    }
    const closeAllModals = () => {
        dispatch({type: CLOSE_ALL_MODALS});
    }
    return {
        menuState: menu,
        notificationsState: notifications,
        searchbarState: searchbar,
        isMenuActive: menu.active,
        isNotificationsActive: notifications.active,
        isSearchbarActive: searchbar.active,
        openSearchbar,
        openNotifications,
        openMenu,
        closeSearchbar,
        closeNotifications,
        closeMenu,
        unmountSearchbar,
        unmountNotifications,
        unmountMenu,
        closeAllModals
    }
}
