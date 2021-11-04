import React, { useEffect, useMemo, useState } from 'react';
import { Keyboard } from 'react-native';

function useDeviceActions() {
    const [keyboardActive, setKeyboardStatus] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
        const showSubscription = Keyboard.addListener(
            'keyboardDidShow',
            (e) => {
                setKeyboardHeight(e.endCoordinates.height);
                setKeyboardStatus(true);
            }
        );
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardStatus(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const response = useMemo(() => {
        return { keyboardActive, keyboardHeight };
    }, [keyboardActive, keyboardHeight]);

    return response;
}

export default useDeviceActions;
