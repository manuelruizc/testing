import React, { useContext, useEffect, useState } from 'react';
import KwivrrModal from 'kwivrr-ui/KwivrrModal';
import WaitListModal from 'kwivrr-ui/WaitListModal/WaitListModal';

export const WaitListContext = React.createContext();

export const WaitListProvider = ({ children }) => {
    const [isModalActive, setIsModalActive] = useState(false);
    const [eventInfo, setEventInfo] = useState(null);
    const openWaitListModal = (info) => {
        setIsModalActive(true);
        setEventInfo(info);
    };
    return (
        <WaitListContext.Provider value={{ openWaitListModal }}>
            {children}
            {isModalActive && (
                <KwivrrModal
                    absoluteCloseButton
                    close={() => setIsModalActive(false)}
                >
                    <WaitListModal eventInfo={eventInfo} />
                </KwivrrModal>
            )}
        </WaitListContext.Provider>
    );
};
