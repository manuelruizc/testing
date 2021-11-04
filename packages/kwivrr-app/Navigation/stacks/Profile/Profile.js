import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { headerOptions } from '../../utils';
import { Text, View } from 'react-native';

// this instead of LMS

const Stack = createStackNavigator();

function ProfileScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>LMS</Text>
      </View>
    );
  }

function Profile(props) {
    const { route: { params } } = props;
    const options = { ...headerOptions(params) };
    return (
      <Stack.Navigator>
        <Stack.Screen name="ProfileStackScreen" component={ProfileScreen} options={options} />
      </Stack.Navigator>
    )
}

export default Profile;
