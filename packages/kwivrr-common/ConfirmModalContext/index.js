import React, { useContext, useEffect, useState } from 'react';
import { ActionSheetIOS } from 'react-native';
import KwivrrModal from 'kwivrr-ui/KwivrrModal';
import Modal from './Modal';
import usePlatform from 'kwivrr-hooks/usePlatftorm';

export const ConfirmModalContext = React.createContext();

export function ConfirmModalProvider({ children }) {
    const [modal, setModal] = useState(false);
    const { isiOS } = usePlatform();
    const [confirmFunction, setConfirmFunction] = useState(null);
    const [labels, setLabels] = useState([]);
    const [params, setParams] = useState([]);
    const openConfirmModal = (_labels, _func, _params) => {
        if (isiOS) {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    title: _labels[0],
                    options: [_labels[1], _labels[2]],
                    destructiveButtonIndex: 1,
                    cancelButtonIndex: 0,
                },
                (buttonIndex) => {
                    if (buttonIndex === 0) {
                    } else if (buttonIndex === 1) {
                        _func(..._params);
                    }
                }
            );
        } else {
            setLabels([..._labels]);
            setConfirmFunction(() => _func);
            setParams([..._params]);
            setModal(true);
        }
    };
    return (
        <ConfirmModalContext.Provider value={{ openConfirmModal }}>
            {children}
            {modal && !isiOS && (
                <KwivrrModal absoluteCloseButton close={() => setModal(false)}>
                    <Modal
                        confirmFunction={confirmFunction}
                        labels={labels}
                        params={params}
                    />
                </KwivrrModal>
            )}
        </ConfirmModalContext.Provider>
    );
}
