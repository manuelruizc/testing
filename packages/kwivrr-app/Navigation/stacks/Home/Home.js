import React from 'react';
import HomePage from '../../../HomePage';
import AboutSettings from '../../../SettingsScreens/AboutSettings';
import NotificationsSettings from '../../../SettingsScreens/NotificationsSettings';
import { headerOptions } from '../../utils';
import AccountSettings from '../../../SettingsScreens/AccountSettings';
import UserProfile from '../../../UserProfile';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../../../SplashScreen';
import { HOME } from 'kwivrr-common/data/types/navigation';
import PaymentHistory from '../../../PaymentHistory';

const Stack = createStackNavigator();

function Home(props) {
    const {
        route: { params },
    } = props;
    const options = { ...headerOptions(params) };
    return (
        <Stack.Navigator initialRouteName={HOME.INITIAL}>
            <Stack.Screen
                name={HOME.HOMEPAGE}
                component={HomePage}
                options={options}
            />
            <Stack.Screen
                name={HOME.NOTIFICATIONS_SETTINGS}
                component={NotificationsSettings}
                options={options}
            />
            <Stack.Screen
                name={HOME.ABOUT_SETTINGS}
                component={AboutSettings}
                options={options}
            />
            <Stack.Screen
                name={HOME.ACCOUNT_SETTINGS}
                component={AccountSettings}
                options={options}
            />
            <Stack.Screen
                name={HOME.SPLASH}
                component={SplashScreen}
                options={options}
            />
            <Stack.Screen
                name={HOME.USER_PROFILE}
                component={UserProfile}
                options={options}
            />
            <Stack.Screen
                name={HOME.PAYMENT_HISTORY}
                component={PaymentHistory}
                options={options}
            />
        </Stack.Navigator>
    );
}

export default Home;
