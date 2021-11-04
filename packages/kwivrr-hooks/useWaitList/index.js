import React from 'react';
import { WaitListContext } from 'kwivrr-common/WaitListContext';

function useWaitList() {
    return React.useContext(WaitListContext);
}

export default useWaitList;
