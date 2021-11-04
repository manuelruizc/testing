import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../../AuthScreens/Login';
import CreateAccount from '../../../AuthScreens/CreateAccount';
import { AUTH } from 'kwivrr-common/data/types/navigation';

const Stack = createStackNavigator();

function Auth({ setIsLogged }) {
    return (
        <Stack.Navigator initialRouteName={AUTH.INITIAL}>
            <Stack.Screen
                name={AUTH.LOGIN}
                component={Login}
                options={{
                    header: () => null,
                    animationEnabled: false,
                }}
            />
            <Stack.Screen
                name={AUTH.CREATEACCOUNT}
                component={CreateAccount}
                options={{
                    header: () => null,
                }}
            />
        </Stack.Navigator>
    );
}

export default Auth;
