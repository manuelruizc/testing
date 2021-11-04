import React from 'react';
import { AppActionsContext } from 'kwivrr-common/AppActionsContext';

const useAppActions = () => React.useContext(AppActionsContext);

export default useAppActions;
