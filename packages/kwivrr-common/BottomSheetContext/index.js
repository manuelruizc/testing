import React, { useRef, useState } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomBottomSheet from './CustomBottomSheet';

export const BottomSheetContext = React.createContext();

export function BottomSheetProvider({ children }) {
    const ref = useRef(null);
    const [bottomSheetState, setBottomSheetState] = useState(false);
    const [bottomSheetInfo, setBottomSheetInfo] = useState({
        type: null,
        items: null,
    });
    const expand = () => {
        setBottomSheetState(true);
    };
    const openBottomSheet = (type = null, items = null) => {
        if (!type) return;
        setBottomSheetInfo({
            type,
            items,
        });
        expand();
    };
    const close = () => {
        ref.current?.close();
    };
    return (
        <BottomSheetContext.Provider
            value={{
                state: bottomSheetState,
                expand,
                close,
                openBottomSheet,
            }}
        >
            {children}
            {bottomSheetState && (
                <CustomBottomSheet
                    bottomSheetInfo={bottomSheetInfo}
                    setBottomSheet={setBottomSheetState}
                    ref={ref}
                />
            )}
        </BottomSheetContext.Provider>
    );
}
