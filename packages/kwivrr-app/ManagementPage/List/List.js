import React, { useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import ListItem from './ListItem';

const data = [
    { id: 1, scope: 'hosting', title: 'My Upcoming Events', attendee: false },
    {
        id: 2,
        scope: 'registeredFor',
        title: 'My Upcoming Attendee Events',
        attendee: true,
    },
    {
        id: 3,
        scope: 'completed',
        title: 'My Completed Events',
        attendee: false,
    },
    { id: 4, scope: 'attended', title: 'My Attended Events', attendee: true },
];

function ListView() {
    const classes = useStyles(styles);
    const [refreshing, setRefreshing] = useState(false);

    return (
        <View style={classes.container}>
            <View style={{ width: '100%', flex: 1 }}>
                <FlatList
                    style={classes.scrollView}
                    contentContainerStyle={classes.scrollViewContentContainer}
                    data={data}
                    keyExtractor={({ id }) => String(id)}
                    renderItem={({ item, index }) => {
                        const { id, scope, title, attendee } = item;
                        return (
                            <ListItem
                                refreshing={refreshing}
                                setRefreshing={setRefreshing}
                                key={id}
                                scope={scope}
                                title={title}
                                attendee={attendee}
                            />
                        );
                    }}
                    refreshing={refreshing}
                    onRefresh={() => setRefreshing(true)}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
}

export default ListView;
