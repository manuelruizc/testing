import { Platform } from 'react-native';
import ZEventsApi, {
    createAuthable,
    createReactNativeAuthableStore,
} from '@icentris/kwivrr-sdk';
import createLocalStorageAuthableStore from 'kwivrr-common/createLocalStorageAuthableStore';

const store = createLocalStorageAuthableStore();
const authable = createAuthable({ store });

const kwivrrApi = new ZEventsApi({
    authable,
    nexioPublicKey:
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvWpIQFjQQCPpaIlJKpeg irp5kLkzLB1AxHmnLk73D3TJbAGqr1QmlsWDBtMPMRpdzzUM7ZwX3kzhIuATV4Pe 7RKp3nZlVmcrT0YCQXBrTwqZNh775z58GP2kZs+gVfNqBampJPzSB/hB62KkByhE Cn6grrRjiAVwJyZVEvs/2vrxaEpO+aE16emtX12RgI5JdzdOiNyZEQteU6zRBRJE ocPWVxExaOpVVVJ5+UnW0LcalzA+lRGRTrQJ5JguAPiAOzRPTK/lYFFpCAl/F8wt oAVG1c8zO2NcQ0Pko+fmeidRFxJ/did2btV+9Mkze3mBphwFmvnxa35LF+Cs/XJHDwIDAQAB',
    clientId: 'gRuQGUSlsFEgTG9P87e3IwOZY8Xx3N_1KQFKOvJDZyc',
    clientSecret: 'bb5qwdHP-KkHFgFkqNUH8kxyDdu0o96C1xMc-ixmNHU',
    actionCableUrl: 'ws://zevents.dev.vibeoffice.com/cable/{accessToken}',
    baseUrl: 'https://zevents.dev.vibeoffice.com',
    nexioPublicKey:
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvWpIQFjQQCPpaIlJKpeg irp5kLkzLB1AxHmnLk73D3TJbAGqr1QmlsWDBtMPMRpdzzUM7ZwX3kzhIuATV4Pe 7RKp3nZlVmcrT0YCQXBrTwqZNh775z58GP2kZs+gVfNqBampJPzSB/hB62KkByhE Cn6grrRjiAVwJyZVEvs/2vrxaEpO+aE16emtX12RgI5JdzdOiNyZEQteU6zRBRJE ocPWVxExaOpVVVJ5+UnW0LcalzA+lRGRTrQJ5JguAPiAOzRPTK/lYFFpCAl/F8wt oAVG1c8zO2NcQ0Pko+fmeidRFxJ/did2btV+9Mkze3mBphwFmvnxa35LF+Cs/XJHDwIDAQAB',
    platform: Platform.OS,
});

export default kwivrrApi;
