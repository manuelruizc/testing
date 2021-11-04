import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LiveStreamPage from '../../../LiveStreamPage';
import StreamPage from '../../../StreamPage/StreamPage';
import { headerOptions } from '../../utils';
import { CREATE } from 'kwivrr-common/data/types/navigation';

const Stack = createStackNavigator();

function Upload(props) {
    const { route } = props;
    const { params } = route;
    return (
        <Stack.Navigator initialRouteName={CREATE.INITIAL}>
            <Stack.Screen
                options={{ ...headerOptions(params) }}
                name={CREATE.CREATEEVENT}
                component={StreamPage}
            />
            {/* <Stack.Screen
                options={{ header: () => null }}
                name={CREATE.LIVESTREAM}
                component={LiveStreamPage}
            /> */}
        </Stack.Navigator>
    );
}

export default Upload;
