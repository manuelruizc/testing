import useStyles from 'kwivrr-hooks/useStyles';
import TextRegular from 'kwivrr-ui/TextRegular';
import React, { useMemo } from 'react';
import { SectionList, View } from 'react-native';
import Header from '../Header';
import SearchItem from '../SearchItem';
import styles from '../styles';

function UserAndEvents({ data }) {
    const DATA = useMemo(() => {
        if (!data) return [];
        if (!data.users && !data.events)
            return [
                {
                    title: 'Users',
                    data: [{ noResults: true, message: 'No users found' }],
                },
                {
                    title: 'Events',
                    data: [{ noResults: true, message: 'No events found' }],
                },
            ];
        if (!data.users)
            return [
                {
                    title: 'Users',
                    data: [{ noResults: true, message: 'No users found' }],
                },
                { title: 'Events', data: data.events },
            ];
        if (!data.events)
            return [
                { title: 'Users', data: data.users },
                {
                    title: 'Events',
                    data: [{ noResults: true, message: 'No events found' }],
                },
            ];
        return [
            {
                title: 'Users',
                data: data.users,
            },
            {
                title: 'Events',
                data: data.events,
            },
        ];
    }, [data]);

    return (
        <React.Fragment>
            {DATA && (
                <SectionList
                    showsVerticalScrollIndicator={false}
                    sections={DATA}
                    keyExtractor={({ id }) => id}
                    renderItem={({ item, index, section: { title } }) => {
                        if (item.noResults) {
                            return <NoItemsLabel text={item.message} />;
                        }
                        return (
                            <SearchItem
                                idx={index}
                                data={item}
                                eventItem={title === 'Events'}
                            />
                        );
                    }}
                    renderSectionHeader={({ section: { title } }) => (
                        <Header title={title} />
                    )}
                />
            )}
        </React.Fragment>
    );
}

function NoItemsLabel({ text }) {
    const classes = useStyles(styles);
    return (
        <View style={classes.noSearchFound}>
            <TextRegular>{text}</TextRegular>
        </View>
    );
}

export default UserAndEvents;
