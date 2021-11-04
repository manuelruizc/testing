import React, { useContext, useState } from 'react';
import ShareModal from 'kwivrr-ui/ShareModal';

export const ShareModalContext = React.createContext();

export function ShareModalProvider({ children }) {
    const [modal, setModal] = useState(false);
    const [modalInfo, setModalInfo] = useState({
        eventImage: '',
        eventName: '',
        eventStartDatetime: '',
        url: '',
        shareUrl: '',
        eventId: 1,
        modalType: 'event',
    });
    const openModal = (modalInfo, modalType = 'event') => {
        setModalInfo((prev) => ({ ...prev, ...modalInfo, modalType }));
        setModal(true);
    };
    const openUserProfileShareModal = (modalInfo, modalType = 'event') => {
        setModalInfo((prev) => ({ ...prev, ...modalInfo, modalType }));
        setModal(true);
    };
    const closeModal = () => setModal(false);
    return (
        <ShareModalContext.Provider
            value={{ openModal, openUserProfileShareModal }}
        >
            {children}
            {modal && (
                <ShareModal
                    closeModal={closeModal}
                    eventImage={modalInfo.eventImage}
                    eventName={modalInfo.eventName}
                    eventStartDatetime={modalInfo.eventStartDatetime}
                    eventId={modalInfo.eventId}
                    url={modalInfo.url}
                    shareUrl={modalInfo.shareUrl}
                    type={modalInfo.type}
                />
            )}
        </ShareModalContext.Provider>
    );
}
