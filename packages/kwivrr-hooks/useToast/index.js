import React from 'react';
import { ToastContext } from 'kwivrr-common/ToastContext';

function useToast() {
    return React.useContext(ToastContext);
}

export default useToast;
