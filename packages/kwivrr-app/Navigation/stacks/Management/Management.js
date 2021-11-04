import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EventTicketManagementPage from '../../../EventTicketManagementPage';
import ManagementPage from '../../../ManagementPage';
import { headerOptions } from '../../utils';
import { MANAGEMENT } from 'kwivrr-common/data/types/navigation';
import EditEvent from '../../../EditEvent';
import SplashScreen from '../../../SplashScreen';

const Stack = createStackNavigator();

function Management(props) {
    const {
        route: { params },
    } = props;
    return (
        <Stack.Navigator initialRouteName={MANAGEMENT.INITIAL}>
            <Stack.Screen
                options={{
                    ...headerOptions(params),
                }}
                name={MANAGEMENT.MANAGEMENT}
                component={ManagementPage}
            />
            <Stack.Screen
                options={{
                    ...headerOptions(params),
                }}
                name={MANAGEMENT.EVENTMANAGEMENT}
                component={EventTicketManagementPage}
            />
            <Stack.Screen
                options={{
                    ...headerOptions(params),
                }}
                name={MANAGEMENT.EDIT_EVENT}
                component={EditEvent}
            />
            <Stack.Screen
                options={{
                    ...headerOptions(params),
                }}
                name={MANAGEMENT.SPLASH}
                component={SplashScreen}
            />
        </Stack.Navigator>
    );
}

export default Management;
