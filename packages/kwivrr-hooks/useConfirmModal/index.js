import React from 'react';
import { ConfirmModalContext } from 'kwivrr-common/ConfirmModalContext';

function useConfirmModal() {
    return React.useContext(ConfirmModalContext);
}

export default useConfirmModal;
