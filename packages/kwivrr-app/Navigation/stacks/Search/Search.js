import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ResultsPageActual from '../../../ResultsPage/ResultsPage';
import { headerOptions } from '../../utils';
// import UserProfile from '../../../UserProfile/';
import { SEARCH } from 'kwivrr-common/data/types/navigation';
import SplashScreen from '../../../SplashScreen';
import UserProfile from '../../../UserProfile';

const Stack = createStackNavigator();

function Search(props) {
    const { route } = props;
    const { params } = route;
    const options = { ...headerOptions(params) };
    return (
        <Stack.Navigator initialRouteName={SEARCH.INITIAL}>
            <Stack.Screen
                name={SEARCH.SEARCH_RESULTS}
                component={ResultsPageActual}
                options={options}
                initialParams={{ searchTerm: params.searchTerm }}
            />
            <Stack.Screen
                name={SEARCH.USER_PROFILE}
                component={UserProfile}
                options={options}
            />
            <Stack.Screen
                name={SEARCH.SPLASH}
                component={SplashScreen}
                options={options}
            />
        </Stack.Navigator>
    );
}

export default Search;
