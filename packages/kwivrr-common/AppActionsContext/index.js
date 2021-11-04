import React, { useState } from 'react';

export const AppActionsContext = React.createContext();

const AppActionsProvider = ({ children }) => {
    const [deletingEvent, setDeletingEvent] = useState(false);
    const [addingNewHomeEvent, setAddingNewHomeEvent] = useState(false);
    const [details, setDetails] = useState({
        action: null,
        screen: null,
        adding: null,
    });
    const [ticketPurchased, setTicketPurchased] = useState(false);
    const [homeEventToAdd, setHomeEventToAdd] = useState(null);
    const addNewEvent = (screenName, action = 'add') => {
        setDetails({ screen: screenName, action, adding: true });
    };
    const deleteNewEvent = () => {
        setDeletingEvent(true);
    };
    const addNewPurchasedEvent = () => {
        setTicketPurchased(true);
    };
    const clearAddedNewPurchasedEvent = () => {
        setTicketPurchased(false);
    };
    const clearAddedNewEvent = () => {
        setDetails({ action: null, screen: null, adding: null });
    };

    return (
        <AppActionsContext.Provider
            value={{
                details,
                addNewEvent,
                clearAddedNewEvent,
                addingNewHomeEvent: details.adding,
                homeEventToAdd,
                setAddingNewHomeEvent,
                addNewPurchasedEvent,
                clearAddedNewPurchasedEvent,
                ticketPurchased,
            }}
        >
            {children}
        </AppActionsContext.Provider>
    );
};

export default AppActionsProvider;
