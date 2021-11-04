import React from 'react';
import { ShareModalContext } from 'kwivrr-common/ShareModalContext';

export function useShareModal() {
    return React.useContext(ShareModalContext);
}