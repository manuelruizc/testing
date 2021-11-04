import React, { useContext } from 'react';
import { QRCodeContext } from 'kwivrr-common/QRCodeContext';

function useQRCode() {
    return useContext(QRCodeContext);
}

export default useQRCode;
