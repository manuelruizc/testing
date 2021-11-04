import AsyncStorage from '@react-native-async-storage/async-storage';
import Emitter from 'kwivrr-common/emitter';

const DEFAULT_STORAGE_KEY = 'credentials';

const createReactNativeAuthableStore = (storageKey) => {
    if (!storageKey) storageKey = DEFAULT_STORAGE_KEY;

    const setCredentials = (creds) => {
        Emitter.emit('AUTHABLE', { eventType: 'REFRESH', data: null });
        return AsyncStorage.setItem(storageKey, JSON.stringify(creds)).then(
            () => {
                return creds;
            }
        );
    };

    const getCredentials = () => {
        return AsyncStorage.getItem(storageKey).then((creds) =>
            JSON.parse(creds)
        );
    };

    const destroyCredentials = () => {
        Emitter.emit('AUTHABLE', { eventType: 'LOGOUT', data: null });
        return AsyncStorage.removeItem(storageKey).then(() => {
            return undefined;
        });
    };
    return {
        setCredentials,
        getCredentials,
        destroyCredentials,
    };
};

export default createReactNativeAuthableStore;
