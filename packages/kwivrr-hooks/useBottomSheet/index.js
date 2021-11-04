import React, { useContext } from 'react';
import { BottomSheetContext } from 'kwivrr-common/BottomSheetContext';

function useBottomSheet() {
    return useContext(BottomSheetContext);
}

export default useBottomSheet;
