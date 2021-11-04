import React from 'react';
import SearchItem from '../../SearchItem';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from '../styles';
import { View } from 'react-native';
import TextRegular from 'kwivrr-ui/TextRegular';

function Events({ searchResults }) {
    if (searchResults.length === 0) {
        return <NoItemsLabel text="No events were found" />;
    }
    return (
        <React.Fragment>
            {searchResults.map(({ attributes }, index) => {
                return <SearchItem idx={index} data={attributes} eventItem />;
            })}
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

export default Events;
