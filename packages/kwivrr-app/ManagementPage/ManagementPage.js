import React, { useEffect, useState, useRef } from 'react';
import { View } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import CalendarView from './CalendarView';
import CardView from './CardView';
import List from './List';
import Header from './Header';
import { VIEWS } from 'kwivrr-common/data/types/managementpage';
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
} from 'react-native-reanimated';
import { useNavigation, useRoute } from '@react-navigation/core';

function ManagementPage() {
    const scrollRef = useRef(null);
    const classes = useStyles(styles);
    const selector = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        const { x } = event.contentOffset;
        selector.value = x;
    });

    // const { navigate } = useNavigation();
    // const { params } = useRoute();
    // if (params.goToTicketManagement) {
    //     alert('hes');
    //     navigate(MANAGEMENT.EVENTMANAGEMENT, {
    //         eventId: params.eventId,
    //     });
    // }

    return (
        <View style={classes.container}>
            <Header selector={selector} scrollRef={scrollRef} />
            <View style={{ flex: 1 }}>
                <Animated.ScrollView
                    ref={scrollRef}
                    horizontal
                    pagingEnabled
                    scrollEnabled={false}
                    onScroll={scrollHandler}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                >
                    {[{ id: 0 }, { id: 1 }, { id: 2 }].map(({ id }, index) => {
                        if (id === VIEWS.CALENDAR) {
                            return <CalendarView key={id} />;
                        }
                        if (id === VIEWS.CARD) {
                            return <CardView key={id} />;
                        }
                        return <List key={id} />;
                    })}
                </Animated.ScrollView>
            </View>
        </View>
    );
}

export default ManagementPage;
