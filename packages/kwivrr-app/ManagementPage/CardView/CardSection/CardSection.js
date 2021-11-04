import React from 'react';
import EventsScrollView from '../../EventsScrollView';

function CardSection({ events, listSummary, ...rest }) {
    return (
        <EventsScrollView
            events={events}
            listSummary={listSummary}
            {...rest}
            // style={classes.scrollViewWithMargin}
        />
    );
}

export default CardSection;
