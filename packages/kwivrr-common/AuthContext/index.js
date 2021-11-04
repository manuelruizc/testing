import React, { useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Emitter from 'kwivrr-common/emitter';
import useAdaptors from 'kwivrr-hooks/useAdaptors';
import useActions from 'kwivrr-hooks/useActions';
import { Alert } from 'react-native';

export const AUTH_STATE = {
    LOGIN_IN: 0,
    LOGGED_OUT: -1,
    LOGGED_IN: 1,
};

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
    const { onFetchUserInfo } = useAdaptors();
    const { onLogin } = useActions();
    const [authState, setAuthState] = useState(AUTH_STATE.LOGGED_OUT);
    const [redirect, setRedirect] = useState({ to: '', state: false });
    const [userInfo, setUserInfo] = useState(null);
    const [credentials, setCredentials] = useState(null);
    const [credentialsLoaded, setCredentialsLoaded] = useState(false);

    const updateUserInfo = (token = null, _userInfo) => {
        setUserInfo(_userInfo);
        //setAuthState(AUTH_STATE.LOGGED_IN);
    };
    const loggedOutRedirect = (screen) => {
        setRedirect({ to: screen, state: true });
        setAuthState(AUTH_STATE.LOGIN_IN);
    };

    const resetRedirect = () => {
        setRedirect({ to: '', state: false });
    };

    // const useUserIsLogged = () => {
    //     const { authState, setAuthState } = useAuthCredentials();
    //     return {
    //         userIsLogged: authState === AUTH_STATE.LOGGED_IN,
    //         setAuthState,
    //     };
    // };

    // useEffect(() => {
    //     if (authState === AUTH_STATE.LOGGED_OUT) {
    //         setUserInfo(null);
    //     }
    // }, [authState, setUserInfo]);

    const getCredentialsOnMount = async () => {
        const credentials = await AsyncStorage.getItem('credentials');
        if (credentials !== null) {
            setCredentials(JSON.parse(credentials));
            setAuthState(AUTH_STATE.LOGGED_IN);
            getUserInfo();
        } else {
            setCredentialsLoaded(true);
        }
    };

    const handleLogin = async (email, password) => {
        try {
            await onLogin(email, password);
            // alert(JSON.stringify(login));
            // const { response, data } = login;
            // const { status } = response;
            // if (status === 200) {
            getUserInfo();
            // }
        } catch (e) {
            Alert.alert('Wrong credentials');
        }
    };

    const getUserInfo = async () => {
        const response = await onFetchUserInfo();
        const __userInfo = response.data.data.attributes;
        const newUserInfo = {
            ...__userInfo,
            id: __userInfo.user_id,
            email: __userInfo.email,
            fullName: `${__userInfo.firstname} ${__userInfo.lastname}`,
            firstName: __userInfo.firstname,
            lastName: __userInfo.lastname,
            tagline: __userInfo.tagline,
            coverUrl: __userInfo.banner_url,
            phone: __userInfo.phone,
            shopLink: __userInfo.shop_link,
            avatar: __userInfo.avatar_url,
        };
        setCredentialsLoaded(true);
        setUserInfo(newUserInfo);
    };

    useEffect(() => {
        Emitter.on('AUTHABLE', (payload) => {
            switch (payload.eventType) {
                case 'LOGIN':
                    break;
                case 'REFRESH':
                    // if (authState === AUTH_STATE.LOGGED_OUT) {
                    setAuthState(AUTH_STATE.LOGGED_IN);
                    setCredentials(payload.data);
                    // }
                    break;
                case 'LOGOUT':
                    setAuthState(AUTH_STATE.LOGGED_OUT);
                    setCredentials(null);
                    setUserInfo(null);
                    break;
            }
        });

        getCredentialsOnMount();

        return () => {
            Emitter.off('AUTHABLE');
        };
    }, []);

    const userIsLogged = useMemo(
        () => authState === AUTH_STATE.LOGGED_IN,
        [authState]
    );
    const userIsLogginIn = useMemo(
        () => authState === AUTH_STATE.LOGIN_IN,
        [authState]
    );
    const userIsNotLogged = useMemo(
        () => authState === AUTH_STATE.LOGGED_OUT,
        [authState]
    );

    const setUserLoggedOut = () => {
        setAuthState(AUTH_STATE.LOGGED_OUT);
    };

    const userType = userInfo ? userInfo.userType : null;

    const navigateToAuth = () => {
        setAuthState(AUTH_STATE.LOGIN_IN);
    };

    const value = {
        authState,
        setAuthState,
        userInfo,
        setUserInfo,
        updateUserInfo,
        loggedOutRedirect,
        redirect,
        resetRedirect,
        credentialsLoaded,
        userIsLogged,
        userIsLogginIn,
        userIsNotLogged,
        userType,
        navigateToAuth,
        handleLogin,
        setUserLoggedOut,
    };
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
