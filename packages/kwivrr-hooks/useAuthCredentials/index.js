import React from 'react';
import { AuthContext } from 'kwivrr-common/AuthContext'

export function useAuthCredentials() {
    return React.useContext(AuthContext);
}