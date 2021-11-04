import React from 'react';
import { TouchableOpacity } from 'react-native';
import HeaderLeft from 'kwivrr-ui/HeaderLeft';
import HeaderRight from 'kwivrr-ui/HeaderRight';
import KwivrrGradient from 'kwivrr-ui/KwivrrGradient';
import TextSubHeader from 'kwivrr-ui/TextSubHeader';
import headerHeight from 'kwivrr-common/headerHeight';
import { AUTH_STATE } from 'kwivrr-common/AuthContext';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';

export const headerOptions = (params) => {
    const { userIsLogged, setAuthState, userInfo } = useAuthCredentials();
    return {
        headerBackground: () => <KwivrrGradient />,
        headerLeft: () => <HeaderLeft />,
        headerTitle: () => null,
        headerRight: () =>
            userIsLogged && userInfo ? (
                <HeaderRight />
            ) : (
                <TouchableOpacity
                    onPress={() => setAuthState(AUTH_STATE.LOGIN_IN)}
                    style={{
                        paddingHorizontal: 18,
                        height: '70%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <TextSubHeader size={16} color="white">
                        Log In
                    </TextSubHeader>
                </TouchableOpacity>
            ),
        headerStyle: { height: headerHeight },
    };
};
