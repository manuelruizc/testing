import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabBar from './BottomTabBar/BottomTabBar';
import LiveStreamPage from '../LiveStreamPage';
import Home from './stacks/Home';
import Search from './stacks/Search';
import Upload from './stacks/Upload';
import Management from './stacks/Management';
import Auth from './stacks/Auth';
import { headerOptions } from './utils';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';
import { LIVESTREAM, STACKS } from 'kwivrr-common/data/types/navigation';
import SplashScreen from '../../../SplashScreen';
import TextRegular from 'kwivrr-ui/TextRegular';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function MyTabs(props) {
    return (
        <Tab.Navigator
            initialRouteName={STACKS.HOME}
            activeColor="#e91e63"
            barStyle={{ backgroundColor: 'white' }}
            tabBar={(navProps) => <BottomTabBar {...navProps} />}
        >
            <Tab.Screen
                name={STACKS.HOME}
                component={Home}
                initialParams={props}
            />
            <Tab.Screen
                name={STACKS.SEARCH}
                component={Search}
                initialParams={props}
            />
            <Tab.Screen
                name={STACKS.CREATE}
                component={Upload}
                initialParams={props}
            />
            {/* <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={props}
      /> */}
            <Tab.Screen
                name={STACKS.MANAGEMENT}
                component={Management}
                initialParams={props}
            />
            <Tab.Screen name={STACKS.LIVESTREAM} component={LiveStreamStack} />
        </Tab.Navigator>
    );
}

function LiveStreamStack(props) {
    const {
        route: { params },
    } = props;
    const options = { ...headerOptions(params) };
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={LIVESTREAM.INITIAL}
                component={LiveStreamPage}
                options={{ header: () => null }}
            />
        </Stack.Navigator>
    );
}

export default function (props) {
    const { userIsNotLogged, userIsLogginIn, credentialsLoaded } =
        useAuthCredentials();
    const [assetsLoaded, setAssetsLoaded] = useState({
        loaded: false,
        loadAssetsFromSplash: false,
    });
    let [fontsLoaded, error] = useFonts({
        'Rubik-Bold': require('../../../assets/fonts/Rubik/Rubik-Bold.ttf'),
        'Rubik-Light': require('../../../assets/fonts/Rubik/Rubik-Light.ttf'),
        'Lora-Bold': require('../../../assets/fonts/Lora/Lora-Bold.ttf'),
        'Lora-Italic': require('../../../assets/fonts/Lora/Lora-Italic.ttf'),
        'Lora-Regular': require('../../../assets/fonts/Lora/Lora-Regular.ttf'),
    });

    useEffect(() => {
        if (fontsLoaded) {
            setAssetsLoaded((prev) => ({
                ...prev,
                loadAssetsFromSplash: true,
            }));
        }
    }, [fontsLoaded]);

    if (!assetsLoaded.loaded || !credentialsLoaded) {
        return (
            <SplashScreen
                setAssetsLoaded={setAssetsLoaded}
                assetsLoaded={assetsLoaded}
            />
        );
    }
    if (error) {
        return <TextRegular>Error when loading fonts.</TextRegular>;
    }

    if (userIsLogginIn) {
        return <Auth {...props} />;
    }
    return <MyTabs {...props} />;
}
