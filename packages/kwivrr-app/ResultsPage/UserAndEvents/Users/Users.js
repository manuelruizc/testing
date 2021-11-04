import React from 'react';
import SearchItem from '../../SearchItem';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from '../styles';
import { View } from 'react-native';
import TextRegular from 'kwivrr-ui/TextRegular';

function Users({ searchResults }) {
    if (searchResults.length === 0) {
        return <NoItemsLabel text="No users were found" />;
    }
    return (
        <React.Fragment>
            {searchResults.map(({ id, type, attributes }, index) => {
                return (
                    <SearchItem
                        idx={index}
                        data={{ id, ...attributes }}
                        eventItem={type === 'event'}
                    />
                );
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

export default Users;
