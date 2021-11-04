import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthCredentials } from '../useAuthCredentials';

const KEY_STORAGE = '@show_tutorial';

function useTutorialInfo() {
    const { userInfo } = useAuthCredentials();
    const isUsersFirstTime = async () => {
        try {
            if (!userInfo) return false;
            let showTutorial = await AsyncStorage.getItem(KEY_STORAGE);
            showTutorial = JSON.parse(showTutorial);
            return (
                !showTutorial.includes(userInfo.email) || showTutorial === null
            );
        } catch (e) {
            return true;
        }
    };
    const dontShowTutorialAnymore = async () => {
        try {
            let tutorialsItem = await AsyncStorage.getItem(KEY_STORAGE);
            tutorialsItem = JSON.parse(tutorialsItem);
            if (tutorialsItem === null) {
                tutorialsItem = [userInfo.email];
            } else {
                tutorialsItem.push(userInfo.email);
            }
            return await AsyncStorage.setItem(
                KEY_STORAGE,
                JSON.stringify(tutorialsItem)
            );
        } catch (e) {
            console.error(e);
        }
    };
    return { isUsersFirstTime, dontShowTutorialAnymore };
}

export default useTutorialInfo;
